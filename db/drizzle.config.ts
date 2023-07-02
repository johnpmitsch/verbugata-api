// drizzle.config.ts
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    connectionString: process.env.DB_URL || "not_provided",
  },
} satisfies Config;
