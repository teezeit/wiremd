#!/usr/bin/env bash
# Package skills/wireframe/ into wireframe-skill.zip for upload to
# Claude Desktop, Claude.ai, or Claude Cowork (Settings → Skills → Upload).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/releases"
OUT="$ROOT/releases/wireframe-skill.zip"

rm -f "$OUT"
cd "$ROOT/extensions/skills"
zip -rq "$OUT" wireframe -x '*.DS_Store'

echo "✓ $OUT"
