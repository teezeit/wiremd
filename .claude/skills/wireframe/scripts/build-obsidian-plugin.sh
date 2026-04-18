#!/usr/bin/env bash
# build-obsidian-plugin.sh — Bundle wiremd Obsidian plugin
#
# Usage (from workspace root):
#   bash .claude/skills/wireframe/scripts/build-obsidian-plugin.sh
#
# Output:
#   external-packages/wiremd/obsidian-plugin/main.js
#
# Install by copying main.js + manifest.json + styles.css to:
#   {your-vault}/.obsidian/plugins/wiremd-preview/

set -e

PLUGIN_DIR="external-packages/wiremd/obsidian-plugin"

echo "Building wiremd Obsidian plugin..."
echo ""

# Install dependencies if needed
if [ ! -d "$PLUGIN_DIR/node_modules" ]; then
  echo "Installing plugin dependencies..."
  (cd "$PLUGIN_DIR" && npm install)
  echo ""
fi

# Build
echo "Bundling..."
(cd "$PLUGIN_DIR" && node esbuild.config.mjs production)
echo ""

echo "Built: $PLUGIN_DIR/main.js"
echo ""

# Auto-install to known vault location
VAULT_PLUGIN_DIR="$HOME/Desktop/areas_of_focus/coding_projects/temp/wireframes/.obsidian/plugins/wiremd-preview"
if [ -d "$(dirname "$VAULT_PLUGIN_DIR")" ]; then
  mkdir -p "$VAULT_PLUGIN_DIR"
  cp "$PLUGIN_DIR/main.js" "$PLUGIN_DIR/manifest.json" "$PLUGIN_DIR/styles.css" "$VAULT_PLUGIN_DIR/"
  echo "Installed to: $VAULT_PLUGIN_DIR"
  echo "Reload Obsidian or run 'Reload app without saving' to pick up changes."
else
  echo "Install with:"
  echo "  cp $PLUGIN_DIR/main.js $PLUGIN_DIR/manifest.json $PLUGIN_DIR/styles.css \"$VAULT_PLUGIN_DIR/\""
fi
