import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("[migrate] No DATABASE_URL — skipping");
  process.exit(0);
}

const client = postgres(url, { prepare: false, max: 1 });
const db = drizzle(client);

await migrate(db, { migrationsFolder: "./drizzle" });
await client.end();

console.log("[migrate] done");
