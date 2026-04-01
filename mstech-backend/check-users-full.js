import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function check() {
  const users = await sql`SELECT id, email, role FROM "user"`;
  console.log('--- Current Users in DB ---');
  console.table(users);
  process.exit(0);
}

check();
