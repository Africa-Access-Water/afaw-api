const { Client } = require('pg');
require('dotenv').config();
const config = require('./config/config');

const client = new Client({
  connectionString: config.databaseUrl,
  ssl: { rejectUnauthorized: false }, // or ssl: false if your DB doesn't require SSL
});

client.connect()
  .then(() => {
    console.log('Connected successfully');
    return client.end();
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
