require('dotenv').config();

export default {
  development: {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET_KEY,
    POOL: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      max: 1,
    },
  },
  production: {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET_KEY,
    POOL: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      max: 10,
    },
  },
};
