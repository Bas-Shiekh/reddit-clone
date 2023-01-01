import { databaseConfig } from './database.config';

const { NODE_ENV } = process.env;

let config;

switch (NODE_ENV) {
  case 'development':
    config = databaseConfig.development;
    break;
  case 'test':
    config = databaseConfig.test;
    break;
  case 'production':
    config = databaseConfig.production;
    break;
  default:
    throw new Error('invalid database url');
}

export default config;
