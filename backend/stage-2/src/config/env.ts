import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB: process.env.DB as string,
  DB_USERNAME: process.env.DB_USERNAME as string,
  DB_PORT: process.env.DB_PORT as string,
};

export default env;
