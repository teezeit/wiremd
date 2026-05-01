# Publishing & Releases

How wiremd ships. Four artifacts ship together under a single version: the npm package, the VS Code extension, the Claude skill, and a standalone CLI bundle. The repo is a pnpm + Turborepo monorepo; releases are coordinated from `packages/core/`.

## Artifacts

| Artifact | Source workspace | Distributed via |
|---|---|---|
| `wiremd` npm package | `packages/core/` | npm registry |
| VS Code extension | `extensions/vscode/` | VS Code Marketplace + GitHub Release `.vsix` |
| Claude skill (wireframe) | `extensions/skills/wireframe/` | `/plugin marketplace add teezeit/wiremd` + GitHub Release zip |
| Standalone CLI bundle | built from `packages/core/src/cli/` | GitHub Release (`releases/wiremd.js`, also bundled into the Claude skill) |

## CI/CD pipelines

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | push to `main`, PRs | Build / typecheck / lint / test on Node 20 + 22 across Linux/macOS/Windows; coverage upload; package shape check |
| `build-bundle.yml` | push to `main` (touching core/skills/extension src or `scripts/build-bundle.mjs`), manual | Rebuild the standalone CLI bundle + `.vsix`; commit the refreshed plugin bin back to `main`; refresh the rolling `latest` GitHub prerelease |
| `docs.yml` | push to `main` (touching `apps/**` or `packages/core/src/**`), manual | Build VitePress docs + landing + editor; deploy the merged tree to GitHub Pages |
| `release.yml` | tag push (`v*`) | Create the GitHub Release with auto-generated notes |
| `publish.yml` | release `published` | Build everything, publish the VS Code extension to the Marketplace via `VSCE_PAT`, attach `wireframe-skill.zip` to the release |

The npm package is **not** published automatically today. See [npm publishing](#npm-publishing) below.

## Pre-release checklist

- [ ] `pnpm turbo run test` is green
- [ ] `pnpm turbo run typecheck` is clean
- [ ] `pnpm turbo run lint` is clean
- [ ] `CHANGELOG.md` has an entry under `[Unreleased]`
- [ ] Documentation reflects the changes (see the Feature Development Checklist in `CONTRIBUTING.md`)
- [ ] The version bump follows [semver](https://semver.org/) — pre-1.0, minor bumps may include breaking changes

## Cutting a release

The version in `packages/core/package.json` is the source of truth. The repo-root `package.json`'s `version` lifecycle hook runs `scripts/sync-versions.mjs` to propagate it to:

- `extensions/vscode/package.json`
- `extensions/skills/wireframe/.claude-plugin/plugin.json`

…and stages those files automatically. Do not bump those by hand.

```bash
# 1. Sanity check
pnpm turbo run test

# 2. Bump version (must run inside packages/core/)
cd packages/core
npm version patch       # or minor / major
# ↑ edits packages/core/package.json,
#   runs sync-versions.mjs (stages vscode + skill plugin.json),
#   commits, and tags.

# 3. Push branch + tag
git push && git push --tags
```

Pushing the tag fires:

1. **`release.yml`** — creates the GitHub release with auto-generated notes.
2. **`publish.yml`** — builds the VS Code extension, publishes it to the Marketplace, and attaches `wireframe-skill.zip` to the release.

No manual steps are needed in GitHub or the VS Code Marketplace.

## Extension-only release

If only the VS Code extension changes and you don't want to bump the npm package, bump the extension independently:

```bash
cd extensions/vscode
npm version patch
git push && git push --tags
```

Then create the GitHub release for that tag manually. `publish.yml` fires on the `release: published` event and pushes the new `.vsix` to the Marketplace.

## npm publishing

Today, `publish.yml` does **not** publish the `wiremd` npm package — only the VS Code extension and the Claude skill zip. Push a new npm version manually after the version bump:

```bash
pnpm --filter wiremd run build
cd packages/core
npm publish --access public
```

To automate it later, add a step to `publish.yml` (gated on an `NPM_TOKEN` secret with publish rights):

```yaml
- name: Publish wiremd to npm
  run: pnpm --filter wiremd publish --access public --no-git-checks
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### NPM token setup

If/when you wire that step up, you will need:

1. An npm token with publish rights for `wiremd` ([npm settings → Tokens](https://www.npmjs.com/settings/~/tokens)). Use an **Automation** token for CI.
2. The token added to GitHub: **Settings → Secrets and variables → Actions → New repository secret**, name `NPM_TOKEN`.
3. `publishConfig.access: "public"` is already set in `packages/core/package.json`.

## Frontend deploys (docs / editor / landing)

`docs.yml` deploys all three frontend apps to GitHub Pages on every push to `main` that touches `apps/docs/**`, `apps/editor/**`, `apps/landing/**`, `packages/core/src/**`, or the workflow itself. The job:

1. Builds `packages/core/` (the editor and docs depend on its types and runtime).
2. Builds `apps/docs/` (`vitepress build`) into `apps/docs/.vitepress/dist/`.
3. Builds `apps/landing/` and overlays its `dist/` onto the VitePress dist root.
4. Builds `apps/editor/` with `VITE_BASE=/wiremd/editor/` and copies it into `apps/docs/.vitepress/dist/editor/`.
5. Uploads the merged tree to the GitHub Pages environment.

The result: `teezeit.github.io/wiremd/` serves the landing page at the root, the docs from VitePress, and the live editor at `/editor/` — all from a single Pages deployment.

## Standalone CLI bundle

`scripts/build-bundle.mjs` produces a single-file CommonJS CLI from `packages/core/src/cli/index.ts` using esbuild and writes it to:

- `releases/wiremd.js` — uploaded to the rolling `latest` GitHub prerelease and to tagged releases
- `extensions/skills/wireframe/bin/wiremd.js` — committed back to the repo so the Claude plugin ships with a self-contained CLI (no `npm install` required for plugin users)

The same script also runs `pnpm package` inside `extensions/vscode/` and copies the resulting `.vsix` to `releases/wiremd.vsix`. `build-bundle.yml` runs this on every relevant push to `main`.

## Verifying a release

After tag push:

1. Watch the [Actions tab](https://github.com/teezeit/wiremd/actions) for `release.yml` and `publish.yml`.
2. Check the release page: https://github.com/teezeit/wiremd/releases — the new tag should have auto-generated notes, `wireframe-skill.zip`, and (for non-extension-only releases) `wiremd.vsix` + `wiremd.js`.
3. Confirm the new VS Code extension version on the [Marketplace](https://marketplace.visualstudio.com/items?itemName=eclectic-ai.wiremd-preview).
4. If you also published to npm: `npm view wiremd version`.

## Manual emergency publish

If CI is broken and a release must ship:

```bash
# Tests + build
pnpm install
pnpm turbo run test
pnpm turbo run build

# npm
pnpm --filter wiremd run build
cd packages/core && npm publish --access public

# VS Code Marketplace (requires VSCE_PAT exported in your shell)
pnpm --filter wiremd-preview run bundle
pnpm --filter wiremd-preview run publish

# Skill zip + CLI bundle
pnpm run skill:zip       # → wireframe-skill.zip
pnpm run bundle          # → releases/wiremd.{js,vsix}
gh release upload v<X.Y.Z> wireframe-skill.zip releases/wiremd.js releases/wiremd.vsix
```

## Troubleshooting

### Publish workflow fails

1. Check the action logs.
2. Common causes: tests failing, `VSCE_PAT` expired (rotate at the [Marketplace publishers page](https://marketplace.visualstudio.com/manage)), version already published.

### Wrong version published

You cannot unpublish npm versions younger than 72 hours. Publish a new patch with the fix instead.

### `sync-versions.mjs` didn't update files

The hook only fires when you run `npm version` inside `packages/core/`. If you bumped manually, run it explicitly: `pnpm run sync-versions` (from the repo root).

## Security

- Never commit `VSCE_PAT`, `NPM_TOKEN`, or any other credentials to the repository.
- Use GitHub repository secrets for all CI tokens.
- Use **Automation** tokens (npm) and **Personal Access Tokens** (vsce) — both can be revoked independently of human accounts.
- Rotate tokens at least annually, and immediately if a contributor with access leaves the project.
- Enable 2FA on the npm and Microsoft (Marketplace publisher) accounts.
