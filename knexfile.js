module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './migrations',
      },
      pool: { min: 2, max: 10 },
      seeds: {
        directory: './data',
      },
    },
  
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './data',
      },
    },
  };