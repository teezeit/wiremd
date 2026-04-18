#!/usr/bin/env bash
# serve.sh — Start a live-reload preview server for a single wireframe file
#
# Usage (from workspace root):
#   bash .claude/skills/wireframe/scripts/serve.sh [file] [--style clean] [--port 3001]
#
# Defaults:
#   file   — packages/wireframes/current/home.md
#   style  — clean
#   port   — 3001

set -e

WIREMD="node external-packages/wiremd/bin/wiremd.js"
FILE="packages/wireframes/home.md"
STYLE="sketch"
PORT="3001"
ROOT="packages/wireframes"

while [[ $# -gt 0 ]]; do
  case $1 in
    --style=*) STYLE="${1#*=}"; shift ;;
    --style)   STYLE="$2"; shift 2 ;;
    --port=*)  PORT="${1#*=}"; shift ;;
    --port)    PORT="$2"; shift 2 ;;
    --*)       echo "Unknown option: $1"; exit 1 ;;
    *)         FILE="$1"; shift ;;
  esac
done

echo "Starting live preview..."
echo "  File:  $FILE"
echo "  Style: $STYLE"
echo "  URL:   http://localhost:$PORT"
echo ""

$WIREMD "$FILE" --watch --serve "$PORT" --style "$STYLE" --root "$ROOT"
