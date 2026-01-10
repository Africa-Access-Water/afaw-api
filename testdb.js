const knex = require('./config/db');

async function testConnection() {
  try {
    const result = await knex.raw('SELECT NOW()');
    console.log('PostgreSQL connected! Time:', result.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
}

testConnection();
