module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './migrations',
      },
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