import query from './';

export default async () => {
  await query(`DO $$ BEGIN
      CREATE TYPE status AS ENUM(
        'processing',
        'new',
        'cancelled',
        'completed'
        );
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$;
        `
      ).catch(error => { throw error });
  await query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`)
  .catch(error => { throw error });
  await query(`CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) not null,
        email VARCHAR(80) not null UNIQUE,
        phone VARCHAR(15) not null,
        password TEXT not null
        )`
      ).catch(error => {
        throw error
      });
  await query(`CREATE TABLE IF NOT EXISTS foods(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) not null,
        category VARCHAR(100) not null,
        description TEXT not null,
        image TEXT, price MONEY not null
        )`
      ).catch(error => { throw error });
  await query(`CREATE TABLE IF NOT EXISTS orders(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID not null,
        foodItems JSONB not null,
        date TIMESTAMP not null,
        status status default 'new' not null
        )`
      ).catch(error => { throw error });
};
