import "dotenv/config";

import path from "node:path";
import { fileURLToPath } from "node:url";

import { serve } from "@hono/node-server";

import { createApp } from "./app.js";
import { createDb, schema, type Db } from "./db/client.js";

const databaseUrl = process.env.DATABASE_URL;
const port = Number(process.env.PORT ?? 3030);

async function makeDb(): Promise<Db> {
  if (databaseUrl && databaseUrl !== "pglite://memory") {
    return createDb(databaseUrl);
  }

  console.log(
    "[wiremd-api] DATABASE_URL not set — using in-memory PGlite. Data will not persist across restarts.",
  );

  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");

  const pg = new PGlite();
  const db = drizzle(pg, { schema });
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  await migrate(db, { migrationsFolder: path.resolve(dirname, "../drizzle") });
  return db as unknown as Db;
}

const db = await makeDb();
const app = createApp(db);

serve({ fetch: app.fetch, port }, ({ port: bound }) => {
  console.log(`[wiremd-api] listening on http://localhost:${bound}`);
  console.log(`[wiremd-api] Swagger UI:  http://localhost:${bound}/api/docs`);
  console.log(`[wiremd-api] OpenAPI:     http://localhost:${bound}/api/openapi.json`);
});
