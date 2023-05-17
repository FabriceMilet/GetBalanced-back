module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        port:'3005',
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      connection: {
        host: 'https://getbalanced-back.onrender.com/',
        port: process.env.PORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './data',
      },
    },
  };