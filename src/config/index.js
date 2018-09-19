export default {
  development: {
    PORT: process.env.PORT,
    SECRET: '',
    POOL: {
    },
  },
  production: {
    environment: 'production',
    PORT: process.env.PORT,
    SECRET: process.env.SECRET_KEY,
    POOL: {
    },
  },
}