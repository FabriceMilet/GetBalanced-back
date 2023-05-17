const knex = require('knex');
const fs = require('fs');

async function setupDatabase() {
  const knexInstance = knex({  client: 'pg',
  connection: process.env.DATABASE_URL});

  try {
    // Exécutez le fichier init_db.sql
    const initDbSql = fs.readFileSync('./migration/init_db.sql', 'utf8');
    await knexInstance.raw(initDbSql);

    // Exécutez les migrations avec Knex
    await knexInstance.migrate.latest();
  } catch (error) {
    console.error(error)
  } finally {
    // Fermez la connexion
    knexInstance.destroy();
  }
}

setupDatabase();