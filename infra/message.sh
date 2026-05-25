#!/bin/bash
# message.sh -- One-way notifications from autonomous jobs or skills.
# Zero dependencies. Just curl.
#
# Usage:
#   ./infra/message.sh "Alpha scan found 3 upgrade candidates"
#   ./infra/message.sh "Deploy complete" --channel slack
#
# Setup:
#   Copy .env.example to .env and add your keys.
#   Only configure the channels you use.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/../.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "No .env file found at $ENV_FILE. Copy .env.example and add your keys." >&2
  exit 1
fi

source "$ENV_FILE"

MESSAGE="${1:?Usage: message.sh \"message\" [--channel telegram|slack|sms]}"
CHANNEL="${3:-${NOTIFY_DEFAULT_CHANNEL:-telegram}}"

send_telegram() {
  if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
    echo "TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID required in .env" >&2
    return 1
  fi
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="${TELEGRAM_CHAT_ID}" \
    -d text="${MESSAGE}" \
    -d parse_mode="Markdown" > /dev/null
}

send_slack() {
  if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
    echo "SLACK_WEBHOOK_URL required in .env" >&2
    return 1
  fi
  curl -s -X POST "${SLACK_WEBHOOK_URL}" \
    -H "Content-Type: application/json" \
    -d "{\"text\": \"${MESSAGE}\"}" > /dev/null
}

send_sms() {
  if [ -z "${TWILIO_ACCOUNT_SID:-}" ] || [ -z "${TWILIO_AUTH_TOKEN:-}" ] || [ -z "${TWILIO_FROM:-}" ] || [ -z "${TWILIO_TO:-}" ]; then
    echo "TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, TWILIO_TO required in .env" >&2
    return 1
  fi
  curl -s -X POST "https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json" \
    -u "${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}" \
    -d "From=${TWILIO_FROM}" \
    -d "To=${TWILIO_TO}" \
    -d "Body=${MESSAGE}" > /dev/null
}

case "${CHANNEL}" in
  telegram) send_telegram ;;
  slack)    send_slack ;;
  sms)      send_sms ;;
  *)        echo "Unknown channel: ${CHANNEL}. Use telegram, slack, or sms." >&2; exit 1 ;;
esac
