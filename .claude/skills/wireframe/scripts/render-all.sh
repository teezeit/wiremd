#!/usr/bin/env bash
# render-all.sh — Render all wiremd .md files to HTML and generate an index page
#
# Usage (from workspace root):
#   bash .claude/skills/wireframe/scripts/render-all.sh [--style clean]
#
# Outputs:
#   packages/wireframes/rendered/current/<route>/*.html
#   packages/wireframes/rendered/future/<route>/*.html
#   packages/wireframes/rendered/index.html

set -e

WIREMD="node external-packages/wiremd/bin/wiremd.js"
STYLE="clean"
SRC="packages/wireframes"
OUT="packages/wireframes/rendered"

while [[ $# -gt 0 ]]; do
  case $1 in
    --style=*) STYLE="${1#*=}"; shift ;;
    --style)   STYLE="$2"; shift 2 ;;
    *) shift ;;
  esac
done

echo "Rendering wireframes (style: $STYLE)..."
echo ""

MANIFEST=$(mktemp)

render_tree() {
  local src_root="$1"
  local out_root="$2"
  local label="$3"

  [ -d "$src_root" ] || return

  while IFS= read -r -d '' f; do
    rel="${f#$src_root/}"
    raw_page=$(basename "$rel" .md)
    # Strip leading NN- order prefix (e.g. 01-general → general)
    page=$(echo "$raw_page" | sed 's/^[0-9]*-//')
    route=$(dirname "$rel")
    [ "$route" = "." ] && route=""

    # Output uses stripped name so links stay clean
    if [ -n "$route" ]; then
      stripped_rel="$route/$page.html"
    else
      stripped_rel="$page.html"
    fi
    out_file="$out_root/$stripped_rel"
    out_dir=$(dirname "$out_file")

    mkdir -p "$out_dir"
    echo "  → $f"
    $WIREMD "$f" -o "$out_file" --style "$STYLE"

    echo "$label|$route|$page|$label/$stripped_rel" >> "$MANIFEST"
  done < <(find "$src_root" -name "*.md" -print0 | sort -z)
}

render_tree "$SRC/current" "$OUT/current" "current"
render_tree "$SRC/future"  "$OUT/future"  "future"

# --- Generate index.html ---

cat > "$OUT/index.html" <<'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JAM Wireframes</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; color: #333; padding: 48px 32px; }
    h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .subtitle { color: #666; font-size: 14px; margin-bottom: 40px; }
    .section { margin-bottom: 40px; }
    .section > h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #999; margin-bottom: 16px; }
    .route-group { margin-bottom: 20px; }
    .route-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .route-label { font-size: 12px; font-weight: 600; color: #555; font-family: monospace; }
    .route-type { font-size: 11px; color: #999; background: #f0f0f0; border-radius: 3px; padding: 1px 6px; }

    /* Single page: full-width card */
    .card-single { background: white; border-radius: 8px; border: 1px solid #e5e5e5; padding: 14px 18px; text-decoration: none; color: inherit; display: inline-flex; align-items: center; gap: 10px; transition: box-shadow 0.15s, border-color 0.15s; }
    .card-single:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #ccc; }
    .card-single .card-name { font-size: 14px; font-weight: 500; }

    /* Tabbed pages: connected tab strip */
    .tab-strip { display: inline-flex; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5; }
    .tab-card { background: white; padding: 12px 16px; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 4px; border-right: 1px solid #e5e5e5; transition: background 0.1s; min-width: 100px; }
    .tab-card:last-child { border-right: none; }
    .tab-card:hover { background: #f8f8f8; }
    .tab-card .card-name { font-size: 13px; font-weight: 500; }
    .tab-card .tab-icon { font-size: 10px; color: #aaa; text-transform: uppercase; letter-spacing: 0.05em; }

    .badge { display: inline-block; font-size: 10px; font-weight: 500; padding: 1px 6px; border-radius: 3px; }
    .badge-current { background: #e8f4fd; color: #0969da; }
    .badge-future  { background: #fff0e6; color: #d1440c; }
    .empty { color: #999; font-size: 14px; padding: 8px 0; }
  </style>
</head>
<body>
  <h1>JAM Wireframes</h1>
  <p class="subtitle">Generated wireframes for the JAM platform</p>
HTMLEOF

emit_section() {
  local filter_label="$1"
  local badge_class="$2"
  local section_title="$3"
  local total=0

  # Collect unique routes
  local routes=()
  while IFS='|' read -r label route page rel; do
    [ "$label" = "$filter_label" ] || continue
    local found=0
    for r in "${routes[@]:-}"; do [ "$r" = "$route" ] && found=1 && break; done
    [ "$found" -eq 0 ] && routes+=("$route")
  done < "$MANIFEST"

  echo "  <div class=\"section\">" >> "$OUT/index.html"
  echo "    <h2>$section_title</h2>" >> "$OUT/index.html"

  if [ ${#routes[@]} -eq 0 ]; then
    echo "    <p class=\"empty\">No wireframes yet.</p>" >> "$OUT/index.html"
    echo "  </div>" >> "$OUT/index.html"
    echo 0; return
  fi

  for route in "${routes[@]}"; do
    # Count pages in this route
    local count=0
    while IFS='|' read -r label r page rel; do
      [ "$label" = "$filter_label" ] || continue
      [ "$r" = "$route" ] || continue
      count=$((count + 1))
    done < "$MANIFEST"

    echo "    <div class=\"route-group\">" >> "$OUT/index.html"

    # Route header
    echo "      <div class=\"route-header\">" >> "$OUT/index.html"
    if [ -n "$route" ]; then
      echo "        <span class=\"route-label\">/$route</span>" >> "$OUT/index.html"
    fi
    if [ "$count" -gt 1 ]; then
      echo "        <span class=\"route-type\">$count tabs</span>" >> "$OUT/index.html"
    fi
    echo "      </div>" >> "$OUT/index.html"

    if [ "$count" -eq 1 ]; then
      # Single page: plain card
      while IFS='|' read -r label r page rel; do
        [ "$label" = "$filter_label" ] || continue
        [ "$r" = "$route" ] || continue
        title=$(echo "$page" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}')
        echo "      <a class=\"card-single\" href=\"$rel\"><span class=\"badge $badge_class\">$filter_label</span><span class=\"card-name\">$title</span></a>" >> "$OUT/index.html"
        total=$((total + 1))
      done < "$MANIFEST"
    else
      # Multiple pages: tab strip
      echo "      <div class=\"tab-strip\">" >> "$OUT/index.html"
      while IFS='|' read -r label r page rel; do
        [ "$label" = "$filter_label" ] || continue
        [ "$r" = "$route" ] || continue
        title=$(echo "$page" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}')
        echo "        <a class=\"tab-card\" href=\"$rel\"><span class=\"tab-icon\">tab</span><span class=\"card-name\">$title</span></a>" >> "$OUT/index.html"
        total=$((total + 1))
      done < "$MANIFEST"
      echo "      </div>" >> "$OUT/index.html"
    fi

    echo "    </div>" >> "$OUT/index.html"
  done

  echo "  </div>" >> "$OUT/index.html"
  echo "$total"
}

current_count=$(emit_section "current" "badge-current" "Current App")
future_count=$(emit_section "future"  "badge-future"  "Future / Proposals")

echo '</body>' >> "$OUT/index.html"
echo '</html>' >> "$OUT/index.html"

rm -f "$MANIFEST"

total=$((current_count + future_count))
echo ""
echo "Done. Rendered $total wireframe(s)."
echo "Open: $OUT/index.html"
