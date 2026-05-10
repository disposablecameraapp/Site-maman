#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PORT=3000
LOG="/tmp/site-maman-preview.log"

if ! curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}" | grep -q "^[23]"; then
  cd "$CLAUDE_PROJECT_DIR"
  setsid nohup python3 -m http.server "$PORT" --bind 0.0.0.0 < /dev/null > "$LOG" 2>&1 &
  disown -a 2>/dev/null || true
fi

exit 0
