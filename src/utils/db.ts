import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host:
    process.env.NODE_ENV === "production" ? process.env.DB_HOST : "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "1973",
  database: process.env.DB_NAME ?? "cofe_elshakh",
});
