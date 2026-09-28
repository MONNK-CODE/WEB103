const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Add it to a .env file before using database routes.');
}

const connectionString = process.env.DATABASE_URL;
const isLocalDatabase = connectionString
  ? /localhost|127\.0\.0\.1/.test(connectionString)
  : true;

const pool = new Pool({
  connectionString,
  ssl: isLocalDatabase ? false : { rejectUnauthorized: false },
});

module.exports = pool;
