import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

console.log("running migrations");
const sql = postgres(process.env.DB_URL || "missingDB_URL", {});
const db = drizzle(sql);

(async () => {
  await migrate(db, { migrationsFolder: "db/migrations" });
  console.log("fully migrated");
  process.exit(0);
})();
