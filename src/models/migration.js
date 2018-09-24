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
        description TEXT not null,
        image TEXT, price MONEY not null
        )`
      ).then(async () => {
        await query(`INSERT INTO foods(
        id, name, description, price
        ) SELECT
        '5d5f3ead-f5e8-41df-b997-a71171506f48',
        'Chinese Chips',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
        1200
         WHERE NOT EXISTS(SELECT 1 FROM foods WHERE id = '5d5f3ead-f5e8-41df-b997-a71171506f48')`
      );
      }).catch(error => { throw error });
  await query(`CREATE TABLE IF NOT EXISTS orders(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID not null,
        foodItems JSONB not null,
        date TIMESTAMP not null,
        status status default 'new' not null
        )`
      ).catch(error => { throw error });
};
