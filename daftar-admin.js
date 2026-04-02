const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const dbUrl = 'postgresql://postgres.rzjhbpwtnwbukwehjbnt:_83._&&z%JLc7Ax@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres';

async function forceAdmin() {
    const client = new Client({ connectionString: dbUrl });
    try {
        await client.connect();
        console.log("Connected to Supabase Postgres...");

        const email = 'admin@mstech.agency';
        const rawPassword = 'admin123456';
        
        // Coba pake bcrypt dulu, kalau gagal nanti kita coba cara lain
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const now = new Date();

        // 1. Bersihkan semua data lama (Urutan: Session -> Account -> User)
        const res = await client.query('SELECT id FROM "user" WHERE email = $1', [email]);
        if (res.rows.length > 0) {
            const oldUserId = res.rows[0].id;
            await client.query('DELETE FROM "session" WHERE "userId" = $1', [oldUserId]);
            await client.query('DELETE FROM "account" WHERE "userId" = $1', [oldUserId]);
            await client.query('DELETE FROM "user" WHERE id = $1', [oldUserId]);
        }

        // 2. Masukkan ke tabel User
        const userId = 'admin-ultimate-id';
        await client.query(
            'INSERT INTO "user" (id, name, email, "emailVerified", role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [userId, 'Super Admin', email, true, 'admin', now, now]
        );

        // 3. Masukkan ke tabel Account (Standard Better Auth)
        const accountId = 'acc-ultimate-id';
        await client.query(
            `INSERT INTO "account" (
                id, "userId", "accountId", "providerId", "password", 
                "createdAt", "updatedAt"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [accountId, userId, email, 'credential', hashedPassword, now, now]
        );

        console.log("------------------------------------------");
        console.log("✅ SISTEM DIRESET! AKUN ADMIN SEKARANG FRESH!");
        console.log(`Email: ${email}`);
        console.log(`Password: ${rawPassword}`);
        console.log("------------------------------------------");
        console.log("Silakan COBA LOGIN LAGI di Website.");

    } catch (err) {
        console.error("Gagal total cuy:", err.message);
    } finally {
        await client.end();
    }
}

forceAdmin();
