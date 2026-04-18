#!/usr/bin/env bash
# Rebuild wiremd dist/ after modifying src/ in external-packages/wiremd.
# The local vite/vitest binaries inside wiremd's node_modules are broken;
# use the workspace-level tools instead.
set -e

WIREMD_DIR="$(cd "$(dirname "$0")/../../../.." && pwd)/external-packages/wiremd"
WORKSPACE_DIR="$(cd "$(dirname "$0")/../../../.." && pwd)"

cd "$WIREMD_DIR"

echo "Building wiremd dist/ ..."
node_modules/.bin/esbuild \
  src/cli/index.ts \
  src/parser/index.ts \
  src/renderer/index.ts \
  src/index.ts \
  --bundle \
  --platform=node \
  --outdir=dist \
  --format=cjs \
  --external:fs \
  --external:path \
  --external:http \
  --external:https \
  --external:crypto \
  --external:os \
  --external:stream \
  --external:util \
  --external:events \
  --external:buffer \
  --external:process \
  --external:url \
  --external:querystring \
  --external:fs/promises

echo "Done. Verifying CLI ..."
node bin/wiremd.js --version
