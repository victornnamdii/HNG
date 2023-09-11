import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
};

export default env;
