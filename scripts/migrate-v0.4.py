#!/usr/bin/env python3
"""wiremd v0.4 migration script.

Converts files written against the old (pre-v0.4) wiremd syntax to the current syntax.

Breaking changes handled
------------------------
1. ::: layout {.sidebar-main} + ::: main wrappers removed (PR #93)
2. ::: grid-N [card] with heading-based column separators
       → ::: columns-N [card] with explicit ::: column children (PR #98)
3. ::: row with heading-based column separators
       → ::: columns-N with explicit ::: column children (PR #96)
4. {.semantic-token} → {semantic-token} for known tokens (PR #102)
   {.col-span-N}     → {span-N}
5. |pill text|       → ((pill text))  (PR #92)
   |pill|{variant}   → ((pill)){variant}

Usage
-----
    python3 scripts/migrate-v0.4.py                    # all .md files under cwd
    python3 scripts/migrate-v0.4.py src/               # specific directory
    python3 scripts/migrate-v0.4.py page.md other.md   # individual files

The script is idempotent — running it twice produces the same result.

Heading-level heuristic
-----------------------
The old grid syntax used headings as column separators. The heading level varied
per file (some used ###, others # for top-level page columns). The script finds
the *minimum* heading level present at depth 0 inside each grid block and treats
only that exact level as column separators. This prevents section headings inside
columns from being misidentified as new columns.

Fenced code blocks (``` ... ```) are never modified.
"""

import re
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Token conversion
# ---------------------------------------------------------------------------

SEMANTIC_TOKENS = {
    "primary", "secondary", "danger", "success", "warning", "error",
    "loading", "disabled", "checked", "right", "left", "center", "top", "bottom",
}

COL_SPAN_RE = re.compile(r"\.col-span-(\d+)")


def convert_token_attrs(text: str) -> str:
    """Convert {.known-token} → {known-token} and {.col-span-N} → {span-N}."""
    def replace(m: re.Match) -> str:
        content = m.group(1)
        if not content.strip():
            return m.group(0)
        new_tokens = []
        for t in content.split():
            span_m = COL_SPAN_RE.match(t)
            if span_m:
                new_tokens.append(f"span-{span_m.group(1)}")
            elif t.startswith(".") and t[1:] in SEMANTIC_TOKENS:
                new_tokens.append(t[1:])
            else:
                new_tokens.append(t)
        return "{" + " ".join(new_tokens) + "}"

    return re.sub(r"\{([^}]*)\}", replace, text)


# ---------------------------------------------------------------------------
# Block / heading helpers
# ---------------------------------------------------------------------------

def is_opener(line: str) -> bool:
    return bool(re.match(r"^:::\s+\S", line.rstrip()))


def is_closer(line: str) -> bool:
    return line.strip() == ":::"


def collect_block(lines: list[str], start: int) -> tuple[list[str], int]:
    """Collect lines from *start* until the matching ::: closer.
    Returns (content_lines, index_after_closer)."""
    depth, content, i = 1, [], start
    while i < len(lines):
        line = lines[i]
        if is_closer(line):
            depth -= 1
            if depth == 0:
                return content, i + 1
            content.append(line)
        elif is_opener(line):
            depth += 1
            content.append(line)
        else:
            content.append(line)
        i += 1
    return content, i


_HEADING_RE = re.compile(r"^(#{1,3})\s*")


def split_by_top_level_headings(
    lines: list[str],
) -> tuple[list[str], list[tuple[str | None, str | None, list[str]]]]:
    """Split *lines* on the column-separator heading level.

    Determines the separator level as the minimum heading level (fewest #)
    seen at depth 0, ignoring fenced code blocks. Returns
    (pre_content, [(title, modifier, content_lines), ...]).
    """
    # Pass 1 — find minimum heading level at depth 0
    depth, in_fence, min_level = 0, False, None
    for line in lines:
        if line.rstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if is_opener(line):
            depth += 1
        elif is_closer(line):
            depth -= 1
        elif depth == 0:
            m = _HEADING_RE.match(line)
            if m:
                lvl = len(m.group(1))
                if min_level is None or lvl < min_level:
                    min_level = lvl

    if min_level is None:
        return lines, []

    # Require *exactly* min_level # chars (negative lookahead blocks ###
    # matching against a # separator)
    sep_re = re.compile(r"^#{" + str(min_level) + r"}(?!#)\s*")

    # Pass 2 — split
    columns: list[tuple] = []
    depth, in_fence = 0, False
    current_title: str | None = None
    current_modifier: str | None = None
    current_content: list[str] = []
    found_first = False
    pre_content: list[str] = []

    for line in lines:
        bucket = current_content if found_first else pre_content
        if line.rstrip().startswith("```"):
            in_fence = not in_fence
            bucket.append(line)
            continue
        if in_fence:
            bucket.append(line)
            continue
        if is_opener(line):
            depth += 1
            bucket.append(line)
        elif is_closer(line):
            depth -= 1
            bucket.append(line)
        elif depth == 0 and sep_re.match(line):
            if found_first:
                columns.append((current_title, current_modifier, current_content))
            found_first = True
            rest = sep_re.sub("", line.rstrip()).strip()
            mod_m = re.match(r"^(.*?)\s*(\{[^}]*\})\s*$", rest)
            if mod_m:
                current_title = mod_m.group(1).strip() or None
                converted = convert_token_attrs(mod_m.group(2))
                current_modifier = converted if converted != "{}" else None
            else:
                current_title = rest or None
                current_modifier = None
            current_content = []
        else:
            bucket.append(line)

    if found_first:
        columns.append((current_title, current_modifier, current_content))

    return pre_content, columns


def build_column_lines(
    title: str | None,
    modifier: str | None,
    content: list[str],
) -> list[str]:
    parts = ["::: column"]
    if title:
        parts.append(title)
    if modifier:
        parts.append(modifier)
    return [" ".join(parts)] + content + [":::"]


# ---------------------------------------------------------------------------
# Transformations
# ---------------------------------------------------------------------------

def transform_grid_block(n: str, card: str, content_lines: list[str]) -> list[str]:
    transformed = transform_lines(content_lines)
    pre, columns = split_by_top_level_headings(transformed)
    opener = f"::: columns-{n}" + (f" {card}" if card else "")
    result = [opener] + pre
    for title, modifier, col_content in columns:
        result.extend(build_column_lines(title, modifier, col_content))
    result.append(":::")
    return result


def transform_row_block(row_opener: str, content_lines: list[str]) -> list[str]:
    """Convert ::: row if it uses heading-based columns; otherwise keep as-is."""
    depth, in_fence = 0, False
    has_headings = False
    for line in content_lines:
        if line.rstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if is_opener(line):
            depth += 1
        elif is_closer(line):
            depth -= 1
        elif depth == 0 and _HEADING_RE.match(line):
            has_headings = True
            break

    if not has_headings:
        new_opener = convert_token_attrs(row_opener.rstrip())
        return [new_opener] + transform_lines(content_lines) + [":::"]

    transformed = transform_lines(content_lines)
    pre, columns = split_by_top_level_headings(transformed)
    result = [f"::: columns-{len(columns)}"] + pre
    for title, modifier, col_content in columns:
        result.extend(build_column_lines(title, modifier, col_content))
    result.append(":::")
    return result


def remove_main_wrapper(lines: list[str]) -> list[str]:
    result, i = [], 0
    while i < len(lines):
        if re.match(r"^:::\s+main\s*$", lines[i].rstrip()):
            content, i = collect_block(lines, i + 1)
            result.extend(content)
        else:
            result.append(lines[i])
            i += 1
    return result


def convert_pills(line: str) -> str:
    """Convert |pill| and |pill|{variant} → ((pill)) and ((pill)){variant}.
    Skips lines with 3+ pipes (markdown table rows).
    """
    if line.count("|") >= 3:
        return line
    if re.match(r"^\s*\|[-:| ]+\|\s*$", line):
        return line
    return re.sub(
        r"\|([^|\n]+)\|(\{[^}]*\})?",
        lambda m: "((" + m.group(1) + "))" + (m.group(2) or ""),
        line,
    )


def transform_lines(lines: list[str]) -> list[str]:
    result: list[str] = []
    i = 0
    in_fence = False

    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip()

        # Fenced code blocks — pass through unchanged
        if stripped.startswith("```"):
            in_fence = not in_fence
            result.append(stripped)
            i += 1
            continue
        if in_fence:
            result.append(stripped)
            i += 1
            continue

        # ::: layout {.sidebar-main} — drop wrapper, keep inner content minus ::: main
        if re.match(r"^:::\s+layout\b", stripped):
            content, i = collect_block(lines, i + 1)
            inner = remove_main_wrapper(content)
            result.extend(transform_lines(inner))
            continue

        # ::: grid-N [card]  or  ::: columns-N [card] (idempotency: re-process orphaned headings)
        grid_m = re.match(r"^:::\s+(?:grid|columns)-(\d+)(\s+card)?\s*$", stripped)
        if grid_m:
            n = grid_m.group(1)
            card = (grid_m.group(2) or "").strip()
            content, i = collect_block(lines, i + 1)
            result.extend(transform_grid_block(n, card, content))
            continue

        # ::: row
        if re.match(r"^:::\s+row\b", stripped):
            content, i = collect_block(lines, i + 1)
            result.extend(transform_row_block(stripped, content))
            continue

        # Regular line — convert tokens then pills
        result.append(convert_pills(convert_token_attrs(stripped)))
        i += 1

    return result


# ---------------------------------------------------------------------------
# File-level entry point
# ---------------------------------------------------------------------------

def migrate_file(path: str) -> bool:
    p = Path(path)
    original = p.read_text()
    lines = original.splitlines()
    transformed = transform_lines(lines)
    new_content = "\n".join(transformed)
    if original.endswith("\n") and not new_content.endswith("\n"):
        new_content += "\n"
    if new_content == original:
        return False
    p.write_text(new_content)
    return True


def collect_md_files(targets: list[str]) -> list[str]:
    paths: list[str] = []
    for t in targets:
        p = Path(t)
        if p.is_file():
            paths.append(str(p))
        elif p.is_dir():
            paths.extend(
                str(f)
                for f in p.rglob("*.md")
                if "node_modules" not in f.parts
            )
    return paths


if __name__ == "__main__":
    targets = sys.argv[1:] or ["."]
    files = collect_md_files(targets)
    changed = unchanged = 0
    for f in files:
        if migrate_file(f):
            print(f"  migrated: {f}")
            changed += 1
        else:
            unchanged += 1
    print(f"\nDone: {changed} changed, {unchanged} unchanged")
