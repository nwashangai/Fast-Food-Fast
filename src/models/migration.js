import query from '../config/dbConnet';

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
  await query(`CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(200) PRIMARY KEY,
        name VARCHAR(100) not null,
        email VARCHAR(80) not null,
        phone VARCHAR(15) not null,
        password TEXT not null
        )`
      ).catch(error => { throw error });
  await query(`CREATE TABLE IF NOT EXISTS food(
        id VARCHAR(200) PRIMARY KEY,
        name VARCHAR(100) not null,
        description TEXT not null,
        image TEXT, price MONEY not null
        )`
      ).catch(error => { throw error });
  await query(`CREATE TABLE IF NOT EXISTS orders(
        id VARCHAR(200) PRIMARY KEY,
        userId VARCHAR(200) not null,
        fooItems JSON not null,
        date TIMESTAMP not null,
        status status default 'new' not null
        )`
      ).catch(error => { throw error });
};
