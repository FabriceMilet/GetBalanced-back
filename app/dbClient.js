// const { Client } = require('pg'); 
// const client = new Client(); 

// client.connect();

// module.exports = client;

const { Pool } = require('pg');
const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = client;