import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not defined in .env");
  process.exit(1);
}

const sql = postgres(databaseUrl);

async function setAdmin() {
  try {
    const result = await sql`UPDATE "user" SET role = 'admin'`;
    console.log('✅ All users updated to admin role:', result.count);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating users:', err);
    process.exit(1);
  }
}

setAdmin();
