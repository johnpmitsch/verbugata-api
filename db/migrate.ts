import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const sql = postgres(process.env.DB_URL || "missingDB_URL", {});
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "drizzle" });
