import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "";

// Create postgres client - use connection pooling for serverless
const client = connectionString
  ? postgres(connectionString, { max: 1 })
  : (null as any);

export const db = client ? drizzle(client) : (null as any);
