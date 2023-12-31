import { Sequelize } from 'sequelize';
import env from './env';

const sq = new Sequelize(env.DB, env.DB_USERNAME, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  dialect: 'postgres',
  logging: false
});

const connectToDB = async () => {
  try {
    await sq.authenticate();
    console.log('Connected to Postgres DB');
  } catch (error) {
    console.log(`Couldn't connect to Postgres DB: ${error}`);
    throw error;
  }
};

export { sq, connectToDB };
