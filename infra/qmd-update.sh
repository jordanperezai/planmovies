#!/bin/bash
cd "$(dirname "$0")/.."
qmd update
qmd embed
