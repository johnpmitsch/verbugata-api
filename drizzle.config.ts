// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DB_URL || "not_provided",
  },
} satisfies Config;
