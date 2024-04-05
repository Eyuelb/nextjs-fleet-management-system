import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",

  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    user: "postgres",
    password: "kidus@DB21!",
    host: "localhost",
    port: 5432,
    database: "fms",
  },
} satisfies Config;
