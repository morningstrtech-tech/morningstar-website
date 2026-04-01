import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function main() {
  try {
    const users = await sql`SELECT email FROM "user"`;
    console.log(JSON.stringify(users));
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

main();
