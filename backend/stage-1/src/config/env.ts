import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT as string,
};

export default env;
