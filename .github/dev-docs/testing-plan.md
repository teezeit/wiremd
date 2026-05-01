# Turborepo Migration — Summary

PR: https://github.com/teezeit/wiremd/pull/71
Branch: `turborepo`

## Goals

Convert wiremd from a single-package npm repo into a **pnpm + Turborepo monorepo**. Make `pnpm install` install everything, `pnpm turbo run <task>` fan out across all workspaces with caching, and let each app/extension consume the core via `"wiremd": "workspace:*"`. Update every doc, workflow, and script that referenced the old layout. Pick up upstream main fixes along the way (PRs #69, #70).

---

## Before state

**Single-package layout** with everything mashed into the root:

```
wiremd/
├── src/                  ← parser, renderers, CLI
├── bin/                  ← CLI entry
├── tests/
├── docs/                 ← VitePress site
├── editor/               ← web editor (Vite + Monaco)
├── landing/              ← marketing site (Vite + Vue)
├── vscode-extension/     ← VS Code extension
├── figma-plugin/
├── skills/wireframe/     ← Claude skill
└── package.json          ← root with library deps + per-app scripts
```

**Root `package.json`** had ~20 scripts: `landing:dev`, `editor:dev`, `docs:build`, `docs:dev`, `dev:lib`, `dev:kill`, `concurrently`-driven dev orchestration, plus the library's own `build`/`test`/`prepare`. The library's runtime deps (`remark`, `unified`, `chokidar`…) lived at root, alongside its devDeps. Every frontend app had its own `package.json` and `package-lock.json`; cross-app dev was glued together with `cd <app> && npm install && npm run …`.

**CI**: `npm ci --prefix editor`, `npm test`, `npm run build`, etc. — sequential, uncached, awkward.

**Releases**: a single `npm version` at root bumped the lib + extension + skill via a `version` lifecycle hook that ran a sync script.

---

## After state

**pnpm + Turborepo monorepo**, four workspace categories:

```
wiremd/
├── packages/core/                  ← published "wiremd" npm package
├── apps/{docs,editor,landing}/     ← three frontend workspaces
├── extensions/{vscode,figma,skills/wireframe}/
├── scripts/                        ← build-bundle, sync-versions, package-skill
├── pnpm-workspace.yaml
├── turbo.json                      ← build/dev/test/typecheck/lint pipelines
└── package.json                    ← only `turbo` as devDep, only delegates to turbo run
```

- **Cross-workspace deps** resolve via `"wiremd": "workspace:*"` — pnpm symlinks them; no copy/build/copy dance.
- **Tasks**: `pnpm turbo run build|dev|test|typecheck|lint|clean` — caches outputs, runs deps before dependents, parallelizes the rest. `--force` rebuild from cold cache: ~14 s.
- **Per-package `turbo.json`** in `apps/docs/` and `extensions/vscode/` extends the root and declares non-default output dirs.
- **VS Code extension** uses `vsce package --no-dependencies` (esbuild already inlines `wiremd`); `.vscodeignore` keeps `.turbo/`, `turbo.json`, `vite.config.ts`, `icon.svg`, `scripts/` out of the published `.vsix`.
- **CI** (`.github/workflows/ci.yml`): one matrix job runs `pnpm turbo run build typecheck lint test`; a separate editor job runs `--filter=wiremd-editor` for build/typecheck/test.
- **Releases**: `cd packages/core && npm version <bump>` triggers `scripts/sync-versions.mjs` (core `version` hook) which propagates the new version into `extensions/vscode/package.json` and `extensions/skills/wireframe/.claude-plugin/plugin.json`. `release.yml` creates the GitHub release on tag push; `publish.yml` builds the `.vsix`, publishes to the Marketplace via `VSCE_PAT`, and attaches the skill zip.
- **Frontend deploys**: `docs.yml` builds core + docs + landing + editor, overlays them into a single `apps/docs/.vitepress/dist/` tree, deploys to GitHub Pages.
- **Documentation rewritten**: `README.md`, `CONTRIBUTING.md`, the docs site's `contributing/publishing.md` and `contributing/testing.md`, all four VS Code docs, both Figma docs, and the marketplace.json source path that was silently broken (`./skills/wireframe` → `./extensions/skills/wireframe`).
- **Test fixes**: four test files (`cli.test.ts`, `cli-unit.test.ts`, `cli-bundle.test.ts`, `server.test.ts`) moved their temp files to `os.tmpdir()` to avoid a race that only manifests in parallel turbo execution (vite's recursive `publicDir` copy in landing walks through `apps/docs/node_modules/wiremd → packages/core/` and trips on test temp files mid-unlink).

**11 commits** ahead of main, +16,074 / −9,620 across 319 files.

---

## Areas I'm not confident about

1. **Marketplace.json fix is unverified end-to-end.** I corrected the source path from `./skills/wireframe` to `./extensions/skills/wireframe`, but I haven't actually run `/plugin marketplace add teezeit/wiremd && /plugin install wireframe@wiremd` against this branch to confirm the install works. If Claude's plugin loader is fussier than I think, there could be more to fix.

2. **Bundle-script timing on first push.** `build-bundle.yml` triggers on pushes to main and commits the regenerated `extensions/skills/wireframe/bin/wiremd.js` back to the repo. After merge, that workflow will fire and produce a new commit. I haven't tested whether the `[skip ci]` tag on that auto-commit actually skips re-triggering the workflow on every monorepo path it now watches. Possible loop hazard.

3. **VS Code extension auto-update behaviour.** The bundled CLI inside the `.vsix` is now produced via esbuild + `--no-dependencies`. Existing users with v0.2.0 installed will auto-upgrade to whatever version the next release tag publishes. I'm confident the runtime behaviour is identical, but I didn't actually install the new `.vsix` on top of an old one to validate state migration, settings preservation, or webview state restore.

4. **Turbo's rename detection during the rebases.** All three rebases (onto `a146fb3`, `d5a92c2`, `f12b392`) succeeded with rename detection following the `editor/ → apps/editor/`, `docs/ → apps/docs/`, etc. moves. Git applied the upstream content fixes through the renames, which is the *correct* behaviour but rare enough that I want CI to confirm nothing was silently dropped.

5. **`apps/landing` `publicDir` overreach.** The race I patched in tests was the *symptom*; the *cause* is that the landing app's `publicDir: '../docs'` recursively copies the whole sibling app, including `node_modules/`. It works today, and I added a defensive note in the test fix commit, but it's a latent bug — if anything in `apps/docs/` ever produces a file vite can't copy (a socket, a non-readable file, a cycle), the landing build will break. I didn't fix this.

6. **`pnpm-lock.yaml` semantics across the rebase.** Each rebase regenerated parts of the lockfile. I ran `pnpm install` and committed the result, but I didn't diff the resolved version graph before/after. A subtle dep version drift could be hiding in there.

7. **No e2e run against this branch.** PR #70 added Playwright nav tests at `tests/e2e/nav.spec.ts`, but `playwright.config.ts` points `baseURL` at the production GitHub Pages URL. They can't run until the new docs are deployed. Until then, the docs nav fix from #70 is unverified on this branch's structure.

8. **CI matrix includes Windows.** The test/build pipeline runs on Windows runners. `os.tmpdir()` works there, but I haven't validated that the new `extensions/vscode/scripts/watch.mjs` (with its `../../packages/core/dist/index.cjs` path) behaves on Windows path separators. Same for the bundle script's `cp -r`/`rm -rf` shell commands — those run on Linux in CI, but local dev on Windows will hit them.

---

## Bugs found and fixed during smoke run (2026-05-01) — commit `997a1d3`

| Bug | Fix |
|-----|-----|
| `pnpm dev` → `wiremd-preview#dev` esbuild failed to resolve wiremd | `watch.mjs`: run initial bundle on startup before setting up watcher |
| `pnpm dev` → `wiremd-docs#dev` vitepress failed to resolve wiremd | `vite.config.ts`: `emptyOutDir: false` in watch mode; vite was clearing dist/ mid-startup |
| `turbo.json` dev task missing `dependsOn: ["^build"]` | Added; dependents now wait for core to build before starting |
| `build-bundle.yml` never produced `releases/wiremd.js` / `.vsix` | Replaced wrong step with `node scripts/build-bundle.mjs` |
| `esbuild` not resolvable from root `package.json` | Added as root devDep |
| `npm version patch` from `packages/core/` didn't sync vscode/skill versions | Added `version` lifecycle hook to `packages/core/package.json` |
| `wireframe-skill.zip` written to repo root instead of `releases/` | `package-skill.sh` + `publish.yml` updated |
| Cursor-sync indicator wrong for files with `![[include]]` | Filed issue #72; `it.fails` regression test added to `includes.test.ts` |

---

## Test plan

### CI gate ✅ 2026-05-01 — all green

- [x] **`ci.yml` test matrix** — Node 20 + 22 × ubuntu-latest, windows-latest, macos-latest. Each runs `pnpm install --frozen-lockfile`, then `pnpm turbo run build typecheck lint test`. All 6 cells green.
- [x] **`ci.yml` coverage job** — `pnpm --filter wiremd run test:coverage` succeeds; coverage uploaded to Codecov.
- [x] **`ci.yml` lint-package job** — `pnpm --filter wiremd run build && cd packages/core && npm pack` produces a valid tarball with `dist/`, `bin/`, `package.json`.
- [x] **`ci.yml` test-editor job** — `pnpm turbo run typecheck --filter=wiremd-editor` and build pass.
- [x] **`ci.yml` test-figma-plugin job** — `pnpm turbo run test --filter=wiremd-figma-plugin` passes.

### Post-merge automation ⏸ blocked until merge

- [ ] **`build-bundle.yml`** runs and commits `extensions/skills/wireframe/bin/wiremd.js`. Verify the auto-commit is `[skip ci]`-tagged so it doesn't loop. Verify the rolling `latest` prerelease has fresh `wiremd.js` + `wiremd.vsix` assets.
- [ ] **`docs.yml`** runs and successfully deploys the merged `apps/docs/.vitepress/dist/` to GitHub Pages. Visit `teezeit.github.io/wiremd/` and confirm:
  - [ ] Landing page loads at `/wiremd/`
  - [ ] Logo click goes to landing (PR #70 fix — `target: '_self'`)
  - [ ] Editor link in docs nav goes to `/wiremd/editor/` (no double base path — PR #69 fix)
  - [ ] Editor opens, Monaco loads, sample wireframe renders

### Manual smoke ✅ 2026-05-01

- [x] **From a clean clone**: `pnpm install && pnpm turbo run build`. All dist outputs present, npm blocked by preinstall guard.
- [x] **`pnpm dev`** — docs (5173), editor (5174), landing (5175) all start and return HTTP 200. *(2 bugs fixed — see table above)*
- [x] **VS Code extension**: `.vsix` built with `pnpm --filter wiremd-preview run package`, installed via `code --install-extension`. Preview opens, style dropdown, viewport switcher, live update on edit all work.
- [x] **Standalone CLI bundle**: `node scripts/build-bundle.mjs && node releases/wiremd.js sample.md -o /tmp/x.html -s clean`. Valid HTML output. *(1 bug fixed — build-bundle.yml was not calling this script)*
- [x] **Plugin CLI bundle**: `node extensions/skills/wireframe/bin/wiremd.js sample.md -o /tmp/y.html`. Valid HTML output.
- [x] **Skill zip**: `pnpm run skill:zip` → `releases/wireframe-skill.zip` contains SKILL.md, commands, references, bin entries. *(moved from repo root to `releases/`)*

### Release-process dry run ✅ 2026-05-01

- [x] **Version sync hook**: `cd packages/core && npm version --no-git-tag-version patch` → `extensions/vscode/package.json` and `extensions/skills/wireframe/.claude-plugin/plugin.json` both updated. *(Bug fixed: hook was missing from core's `package.json`; only existed at root)*
- [x] **`release.yml` workflow logic**: tag push produces a release with auto-generated notes. ✓
- [x] **`publish.yml` workflow logic**: `release: published` trigger runs publish + attaches `releases/wireframe-skill.zip`. ✓

### Claude plugin install ✅ 2026-05-01

- [x] **Claude Code** (`--plugin-dir`): `claude --plugin-dir ./extensions/skills/wireframe` → `/wireframe:wireframe` activates, rendering modes (display / editor / serve) all work.
- [x] **Claude Desktop**: `releases/wireframe-skill.zip` uploaded via Settings → Skills. Skill activates and `/wireframe:wireframe` works.

### Known issues

- **Cursor-sync off for files with `![[include]]` directives** — issue #72. `data-source-line` values in the rendered HTML are based on resolved (post-include) line numbers, while VS Code reports original file line numbers. Indicator is wrong for any element appearing after an include. Regression test added as `it.fails` in `packages/core/tests/includes.test.ts`.

### E2E ⏸ blocked until docs deploy to Pages

- [ ] `pnpm install && pnpm test:e2e` (Playwright). All 3 nav specs pass against `https://teezeit.github.io/wiremd/...`.
