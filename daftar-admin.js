const bcrypt = require('bcryptjs');

// URL Database Anda dari history
const supabaseUrl = 'https://rzjhbpwtnwbukwehjbnt.supabase.co';
// Gunakan Service Role Key agar bisa bypass semua aturan (RLS)
// Karena saya tidak punya key-nya, saya akan pakai DATABASE_URL untuk update via Postgres langsung menggunakan paket pg
const { Client } = require('pg');

const dbUrl = 'postgresql://postgres.rzjhbpwtnwbukwehjbnt:_83._&&z%JLc7Ax@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres';

async function forceAdmin() {
    const client = new Client({ connectionString: dbUrl });
    try {
        await client.connect();
        console.log("Connected to Supabase Postgres...");

        const email = 'admin@mstech.agency';
        const rawPassword = 'admin123456';
        
        // 1. Hash password manual (mirip cara better-auth)
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const now = new Date();

        // 2. Hapus jika sudah ada (biar bersih)
        await client.query('DELETE FROM "account" WHERE "userId" IN (SELECT id FROM "user" WHERE email = $1)', [email]);
        await client.query('DELETE FROM "user" WHERE email = $1', [email]);

        // 3. Masukkan User baru sebagai ADMIN
        const userId = 'admin-' + Math.random().toString(36).substring(2, 15);
        await client.query(
            'INSERT INTO "user" (id, name, email, "emailVerified", role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [userId, 'Super Admin', email, true, 'admin', now, now]
        );

        // 4. Masukkan Account (agar sistem Auth kenal passwordnya)
        const accountId = 'acc-' + Math.random().toString(36).substring(2, 15);
        await client.query(
            'INSERT INTO "account" (id, "userId", "accountId", "providerId", "password", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [accountId, userId, email, 'credential', hashedPassword, now, now]
        );

        console.log("------------------------------------------");
        console.log("✅ BERHASIL! AKUN ADMIN TELAH DIBUAT!");
        console.log(`Email: ${email}`);
        console.log(`Pangkat: ADMIN`);
        console.log("------------------------------------------");
        console.log("Silakan langsung LOGIN di Website sekarang.");

    } catch (err) {
        console.error("Gagal bos:", err.message);
    } finally {
        await client.end();
    }
}

forceAdmin();
