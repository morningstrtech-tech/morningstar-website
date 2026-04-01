import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

console.log("Testing connection to:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

const sql = postgres(process.env.DATABASE_URL);

async function test() {
  try {
    const result = await sql`SELECT 1 as connected`;
    console.log("Success:", result);
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
