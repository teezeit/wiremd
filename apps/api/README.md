# wiremd-api

Collaboration API for wiremd: a small persistent store so multiple people can edit the same wiremd project via a shared URL (`/p/:projectId`), as a complement to the existing URL-fragment "share by URL" flow.

**Status:** POC. No auth. Security is by obscurity — project IDs are 21-char nanoids (~125 bits of entropy).

## Stack

- **Hono** + **@hono/zod-openapi** — typed router. Route definitions are the single source of truth for both runtime validation and the OpenAPI 3.0 spec.
- **Swagger UI** at `/api/docs`, OpenAPI JSON at `/api/openapi.json`.
- **Drizzle ORM** + **postgres.js** — typed schema, generated migrations.
- **Postgres** (production) via Supabase Supavisor pooler (port 6543, transaction mode) for serverless-safe connection management.
- **PGlite** (local dev fallback + tests) — in-process Postgres in WASM, no Docker.
- **Zod** — request/response schemas.
- **Vercel Functions** — production runtime, `nodejs` flavor.

## Endpoints

```
POST   /api/projects            { content }              → 201 { id }
GET    /api/projects/:id                                 → 200 { id, content, updatedAt }   | 404
HEAD   /api/projects/:id                                 → 200                              | 404
PUT    /api/projects/:id        { content }              → 200 { updatedAt }                | 404
GET    /api/health                                       → 200 { ok, time }
```

Deliberately **not** here:
- No `LIST` — enumeration would defeat security-by-obscurity.
- No `DELETE` — without auth, exposing a delete endpoint is a footgun. Delete server-side via SQL when needed.
- No conflict-resolution / version negotiation — last-write-wins for the POC. Designed to be added later without a schema migration.

## Data model

Forward-designed for multi-file even though the editor only ships single-file UX for now:

- `project (id, created_at, updated_at)` — one row per project.
- `project_file (id, project_id, path, content, created_at, updated_at)` — S3-style key/value, `UNIQUE (project_id, path)`. The POC always writes to `path = 'index.md'`. Multi-file UX later is purely additive.

## Local development

Two paths — pick whichever fits the moment.

### Path A — Docker Postgres (recommended for real work)

A `docker-compose.yml` is included alongside the api. The DB persists across restarts and is reachable from any SQL client (psql, TablePlus, DBeaver, Drizzle Studio).

```bash
pnpm install
cp apps/api/.env.example apps/api/.env

pnpm --filter wiremd-api run db:up        # starts Postgres on :5432
pnpm --filter wiremd-api run db:migrate   # applies drizzle migrations
pnpm --filter wiremd-api run dev          # → http://localhost:3030
```

Default credentials match the .env.example:
```
postgres://wiremd:wiremd@localhost:5432/wiremd
```

Connect from any client with that URL, or use the helpers:

```bash
pnpm --filter wiremd-api run db:studio    # browser-based ORM-aware UI (Drizzle Studio)
pnpm --filter wiremd-api run db:logs      # tail Postgres logs
pnpm --filter wiremd-api run db:reset     # nuke volume + restart (destroys all data)
pnpm --filter wiremd-api run db:down      # stop containers (keeps data)
```

### Path B — Zero-setup PGlite (for quick smoke tests)

Leave `DATABASE_URL` unset. The dev server boots an in-memory Postgres (PGlite) and applies migrations automatically. **Data vanishes on every restart, no SQL client can connect** — but `pnpm dev` works on a fresh laptop with no docker.

```bash
pnpm install
pnpm --filter wiremd-api run dev
```

### Either way

```
http://localhost:3030
Swagger UI:  http://localhost:3030/api/docs
OpenAPI:     http://localhost:3030/api/openapi.json
```

CLI smoke test:
```bash
curl -s http://localhost:3030/api/health
curl -sX POST http://localhost:3030/api/projects \
  -H 'content-type: application/json' \
  -d '{"content":"# hello\n[Save]*"}'
# → {"id":"<nanoid>"}
```

## Deploy (Vercel)

1. `vercel link` from `apps/api/`.
2. Set `DATABASE_URL` in the Vercel project's env vars (use the Supavisor pooler URL on port 6543).
3. `vercel deploy --prod` (or push to a branch with the GitHub integration enabled).
4. Run migrations once after each schema change: `DATABASE_URL=... pnpm --filter wiremd-api run db:migrate` from your machine, or wire as a GitHub Action.

## What's intentionally missing

- Conflict resolution UI (additive: `ALTER TABLE project ADD COLUMN version int NOT NULL DEFAULT 1;` + ~40 LOC).
- Rate limiting (use `@upstash/ratelimit` when traffic warrants).
- Sentry (drop in `@sentry/node` middleware when you want it).
- Auth (turn on Supabase Auth, verify JWT in middleware — same pattern used elsewhere).
