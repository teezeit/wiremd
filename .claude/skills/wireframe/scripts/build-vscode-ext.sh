#!/usr/bin/env bash
# build-vscode-ext.sh — Bundle and package the wiremd VS Code extension as a .vsix
#
# Usage (from workspace root):
#   bash .claude/skills/wireframe/scripts/build-vscode-ext.sh
#
# Output:
#   external-packages/wiremd/vscode-extension/wiremd-preview-<version>.vsix
#
# After this, install with:
#   code --install-extension external-packages/wiremd/vscode-extension/wiremd-preview-<version>.vsix

set -e

EXT_DIR="external-packages/wiremd/vscode-extension"

echo "Building wiremd VS Code extension..."
echo ""

# Install extension dependencies if node_modules/wiremd is missing
if [ ! -d "$EXT_DIR/node_modules/wiremd" ]; then
  echo "Installing extension dependencies..."
  (cd "$EXT_DIR" && npm install)
  echo ""
fi

# Bundle (esbuild — picks up latest dist/ from parent wiremd package)
echo "Bundling extension..."
(cd "$EXT_DIR" && npm run bundle)
echo ""

# Package into .vsix (run from inside EXT_DIR so vsce paths resolve correctly)
echo "Packaging .vsix..."
(cd "$EXT_DIR" && node node_modules/@vscode/vsce/vsce package --no-yarn --allow-missing-repository)
echo ""

# Print the output path
VSIX=$(ls -t "$EXT_DIR"/wiremd-preview-*.vsix 2>/dev/null | head -1)
if [ -z "$VSIX" ]; then
  echo "ERROR: .vsix not found after packaging" >&2
  exit 1
fi

echo "Built: $VSIX"
echo ""
echo "Install with:"
echo "  code --install-extension $VSIX --force"
