const fs = require('fs');
const path = require('path');
const pool = require('./database');

async function resetDatabase() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const seedPath = path.join(__dirname, 'seed.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const seed = fs.readFileSync(seedPath, 'utf8');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(schema);
    await client.query(seed);
    await client.query('COMMIT');

    const result = await client.query('SELECT id, slug, title, category FROM careers ORDER BY id;');
    console.table(result.rows);
    console.log(`Database reset complete. Seeded ${result.rowCount} careers.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

resetDatabase().catch((error) => {
  console.error('Database reset failed:', error.message);
  process.exit(1);
});
