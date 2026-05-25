#!/usr/bin/env tsx
// Skill adapter. Discovers SKILL.md files, resolves aliases, builds prompts.
// Works with any CLI agent: claude, codex, or just prints the prompt for piping.
//
// Usage:
//   ./infra/skill-adapt list
//   ./infra/skill-adapt <skill> [args...]           # prints prompt (default)
//   ./infra/skill-adapt run <skill> [args...]        # runs via detected agent
//   ./infra/skill-adapt run --agent claude <skill>   # runs via specific agent

import { existsSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { resolve, join, basename } from "node:path";
import { spawnSync, execSync } from "node:child_process";

type Skill = {
  id: string;
  name: string;
  description: string;
  path: string;
  source: "repo" | "global";
  triggers: string[];
};

type Agent = "claude" | "codex";

const repoRoot = resolve(import.meta.dirname, "..");
const skillRoots = [
  { source: "repo" as const, path: join(repoRoot, ".claude", "skills") },
  { source: "global" as const, path: resolve(process.env.HOME ?? "", ".claude", "skills") },
];

function readFrontmatter(markdown: string): Record<string, string | string[]> {
  if (!markdown.startsWith("---\n")) return {};
  const end = markdown.indexOf("\n---", 4);
  if (end === -1) return {};

  const lines = markdown.slice(4, end).split("\n");
  const data: Record<string, string | string[]> = {};
  let activeListKey: string | null = null;

  for (const line of lines) {
    const listItem = line.match(/^\s*-\s+["']?(.+?)["']?\s*$/);
    if (activeListKey && listItem) {
      const current = data[activeListKey];
      data[activeListKey] = Array.isArray(current) ? [...current, listItem[1]] : [listItem[1]];
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) {
      activeListKey = null;
      continue;
    }

    const [, key, rawValue] = pair;
    const value = rawValue.trim();
    activeListKey = null;

    if (!value) {
      data[key] = [];
      activeListKey = key;
      continue;
    }

    const inlineList = value.match(/^\[(.*)\]$/);
    if (inlineList) {
      data[key] = inlineList[1]
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    data[key] = value.replace(/^["']|["']$/g, "");
  }

  return data;
}

function discoverSkills(): Skill[] {
  const skills: Skill[] = [];

  for (const root of skillRoots) {
    if (!existsSync(root.path)) continue;
    for (const dirent of readdirSync(root.path, { withFileTypes: true })) {
      if (!dirent.isDirectory()) continue;

      const skillPath = join(root.path, dirent.name, "SKILL.md");
      if (!existsSync(skillPath)) continue;

      const markdown = readFileSync(skillPath, "utf8");
      const frontmatter = readFrontmatter(markdown);
      const name = String(frontmatter.name || dirent.name);
      const description = String(frontmatter.description || "").trim();
      const frontmatterTriggers = Array.isArray(frontmatter.triggers) ? frontmatter.triggers : [];
      const triggers = [...frontmatterTriggers, name, `/${name}`, dirent.name, `/${dirent.name}`];

      skills.push({
        id: dirent.name,
        name,
        description,
        path: skillPath,
        source: root.source,
        triggers,
      });
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function resolveSkill(query: string, skills: Skill[]): Skill | null {
  const normalized = query.replace(/^\//, "").toLowerCase();

  return (
    skills.find((skill) => skill.name.toLowerCase() === normalized) ??
    skills.find((skill) => skill.id.toLowerCase() === normalized) ??
    skills.find((skill) => skill.triggers.some((trigger) => trigger.replace(/^\//, "").toLowerCase() === normalized)) ??
    null
  );
}

function buildPrompt(skill: Skill, args: string[]): string {
  const memoryPath = skill.path.replace(/SKILL\.md$/, "memory.md");
  const upperMemoryPath = skill.path.replace(/SKILL\.md$/, "MEMORY.md");
  const seenMemoryPaths = new Set<string>();
  const memories = [memoryPath, upperMemoryPath].filter((path) => {
    if (!existsSync(path)) return false;
    const realPath = realpathSync(path).toLowerCase();
    if (seenMemoryPaths.has(realPath)) return false;
    seenMemoryPaths.add(realPath);
    return true;
  });
  const argumentText = args.length ? args.join(" ") : "(no explicit arguments)";

  return [
    `Use the skill "${skill.name}".`,
    ``,
    `Skill file: ${skill.path}`,
    memories.length ? `Skill memory: ${memories.join(", ")}` : `Skill memory: none found`,
    `Arguments: ${argumentText}`,
    ``,
    `Read the skill file first, then follow its workflow for this request.`,
  ].join("\n");
}

function detectAgent(): Agent | null {
  for (const agent of ["claude", "codex"] as Agent[]) {
    try {
      execSync(`which ${agent}`, { stdio: "ignore" });
      return agent;
    } catch {}
  }
  return null;
}

function runWithAgent(agent: Agent, prompt: string): never {
  const commands: Record<Agent, string[]> = {
    claude: ["claude", "--print", prompt],
    codex: ["codex", "-C", repoRoot, prompt],
  };

  const result = spawnSync(commands[agent][0], commands[agent].slice(1), {
    stdio: "inherit",
    cwd: repoRoot,
  });
  process.exit(result.status ?? 1);
}

function printHelp(skills: Skill[]): void {
  console.log(`Zordon skill adapter\n`);
  console.log(`Usage:`);
  console.log(`  ./skill-adapt list                          List all discovered skills`);
  console.log(`  ./skill-adapt <skill> [args...]              Print the skill prompt`);
  console.log(`  ./skill-adapt run <skill> [args...]          Run via auto-detected agent`);
  console.log(`  ./skill-adapt run --agent claude <skill>     Run via specific agent\n`);
  console.log(`Agents: claude, codex\n`);
  console.log(`Discovered ${skills.length} skills.`);
}

function listSkills(skills: Skill[]): void {
  const rows = skills.map((skill) => ({
    name: skill.name,
    source: skill.source,
    path: skill.path.replace(`${repoRoot}/`, ""),
    description: skill.description,
  }));
  console.table(rows);
}

function main(): void {
  const skills = discoverSkills();
  const rawArgs = process.argv.slice(2);

  if (!rawArgs.length || ["help", "--help", "-h"].includes(rawArgs[0])) {
    printHelp(skills);
    return;
  }

  if (rawArgs[0] === "list") {
    listSkills(skills);
    return;
  }

  if (rawArgs[0] === "run") {
    let agentOverride: Agent | null = null;
    let skillArgs = rawArgs.slice(1);

    if (skillArgs[0] === "--agent" && skillArgs[1]) {
      agentOverride = skillArgs[1] as Agent;
      skillArgs = skillArgs.slice(2);
    }

    const skillQuery = skillArgs[0];
    if (!skillQuery) {
      console.error("Missing skill name.");
      process.exit(1);
    }

    const skill = resolveSkill(skillQuery, skills);
    if (!skill) {
      console.error(`Unknown skill: ${skillQuery}`);
      process.exit(1);
    }

    const agent = agentOverride ?? detectAgent();
    if (!agent) {
      console.error("No agent found. Install claude or codex CLI.");
      process.exit(1);
    }

    const prompt = buildPrompt(skill, skillArgs.slice(1));
    console.error(`Running "${skill.name}" via ${agent}...`);
    runWithAgent(agent, prompt);
  }

  const skillQuery = rawArgs[0];
  const skill = resolveSkill(skillQuery, skills);
  if (!skill) {
    console.error(`Unknown skill: ${skillQuery}`);
    console.error(`Run "./skill-adapt list" to see available skills.`);
    process.exit(1);
  }

  const prompt = buildPrompt(skill, rawArgs.slice(1));
  console.log(prompt);
}

main();
