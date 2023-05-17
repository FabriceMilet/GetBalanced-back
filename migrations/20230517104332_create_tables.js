/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.raw(`
      BEGIN;
  
      -- DROP TABLE
      IF EXISTS "user",
      planner,
      category,
      task,
      user_has_planner;
  
      -- CREATE DOMAIN email as text CHECK (VALUE ~ '^[a-z0-9][a-z_-!?.+0-9]*[a-z0-9]@[a-z]{1,63}\.[a-z]{2,63}$');
  
      CREATE TABLE "user" (
          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          firstname text NOT NULL,
          lastname text NOT NULL,
          email text UNIQUE NOT NULL,
          birthdate TIMESTAMPTZ,
          avatar text,
          password text NOT NULL,
          token text,
          color text NOT NULL DEFAULT '#b0b',
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ
      );
  
      CREATE TABLE planner (
          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name text NOT NULL,
          description TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ
      );
  
      CREATE TABLE category (
          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          label text NOT NULL,
          color text NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ
      );
  
      CREATE TABLE task (
          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name text NOT NULL,
          description text,
          date TIMESTAMPTZ NOT NULL,
          done BOOLEAN DEFAULT FALSE,
          border_color text DEFAULT '#000000',
          planner_id int REFERENCES planner(id) ON DELETE CASCADE,
          category_id int REFERENCES category(id) ON DELETE CASCADE,
          user_id int REFERENCES "user"(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ
      );
  
      CREATE TABLE user_has_planner (
          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          user_id int REFERENCES "user"(id) ON DELETE CASCADE,
          planner_id int REFERENCES planner(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ
      );
  
      -- ALTER TABLE
      ALTER TABLE IF EXISTS task
          ADD COLUMN category text;
  
      -- CREATE TABLE
      CREATE TABLE invite (
          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          user_email text NOT NULL,
          planner_id int NOT NULL
      );
  
      COMMIT;
    `);
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw(`
      -- Revert getbalanced:1.create_tables from pg
  
      BEGIN;
  
      DROP TABLE
          "user",
          planner,
          category,
          task,
          user_has_planner;
  
      -- DROP DOMAIN 
      --     email_address;
  
      COMMIT;
    `);
  };
