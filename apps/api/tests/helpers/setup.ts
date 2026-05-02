import path from "node:path";
import { fileURLToPath } from "node:url";

import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

import { createApp } from "../../src/app.js";
import { schema } from "../../src/db/client.js";
import type { Db } from "../../src/db/client.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_FOLDER = path.resolve(__dirname, "../../drizzle");

export type TestContext = {
  app: ReturnType<typeof createApp>;
  db: Db;
  cleanup: () => Promise<void>;
};

/**
 * Spin up an isolated in-process Postgres (PGlite) per test, apply migrations,
 * and bind a fresh Hono app to it. No Docker, no shared state.
 */
export async function createTestContext(): Promise<TestContext> {
  const pg = new PGlite();
  const db = drizzle(pg, { schema });
  await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });

  const app = createApp(db as unknown as Db);

  return {
    app,
    db: db as unknown as Db,
    cleanup: async () => {
      await pg.close();
    },
  };
}

const TEST_ORIGIN = "http://localhost:5174";

type CallInit = {
  method?: string;
  headers?: Record<string, string>;
  json?: unknown;
};

/**
 * Convenience wrapper around `app.request()` that sets a whitelisted CORS
 * origin and JSON-encodes bodies. Returns the Response so tests can assert
 * on status, headers, and parsed bodies.
 */
export async function callApp(
  app: ReturnType<typeof createApp>,
  path: string,
  init: CallInit = {},
): Promise<Response> {
  const headers: Record<string, string> = { origin: TEST_ORIGIN, ...(init.headers ?? {}) };

  let body: string | undefined;
  if (init.json !== undefined) {
    body = JSON.stringify(init.json);
    headers["content-type"] ??= "application/json";
  }

  return await app.request(path, { method: init.method, headers, body });
}
