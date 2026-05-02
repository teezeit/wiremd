import { createApp } from "../src/app.js";
import { createDb } from "../src/db/client.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Use the Supabase Supavisor pooler URL (port 6543, transaction mode).",
  );
}

export default createApp(createDb(databaseUrl));

