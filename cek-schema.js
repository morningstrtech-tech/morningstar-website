const { Client } = require('pg');
const dbUrl = 'postgresql://postgres.rzjhbpwtnwbukwehjbnt:_83._&&z%JLc7Ax@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres';

async function checkSchema() {
    const client = new Client({ connectionString: dbUrl });
    try {
        await client.connect();
        const res = await client.query(`
            SELECT table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name IN ('user', 'account')
            ORDER BY table_name, ordinal_position
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkSchema();
