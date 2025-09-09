import 'dotenv/config';

import { DataSource } from 'typeorm';

import envFn from '../../../configuration/utils/configuration';

const env = envFn();

/* USED BY TYPEORM CLI */
export default new DataSource({
  name: 'default',
  type: 'postgres',
  host: env.database.default.host,
  port: env.database.default.port,
  database: env.database.default.database,
  username: env.database.default.username,
  password: env.database.default.password,
  connectTimeoutMS: env.database.default.timeout,
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/modules/**/migrations/*.js'],
  migrationsRun: true,
  synchronize: false
});
