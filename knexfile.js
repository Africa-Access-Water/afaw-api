require('dotenv').config();
const config = require('./config/config');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: config.databaseUrl,
      // ssl: { rejectUnauthorized: false }, // if your DB requires SSL, else false
      ssl: false
    },
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: config.databaseUrl,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './migrations',
    },
  },
};
