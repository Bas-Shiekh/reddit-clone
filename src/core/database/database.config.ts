import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './dbConfig.interface';
dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_DEV,
    dialect: process.env.DATABASE_DIALECT,
  },
  test: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_TEST,
    dialect: process.env.DATABASE_DIALECT,
  },
  production: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_PRODUCTION,
    dialect: process.env.DATABASE_DIALECT,
  },
};
