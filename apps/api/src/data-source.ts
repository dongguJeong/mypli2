// apps/api/src/typeorm.config.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'develpment') {
  dotenv.config();
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],

  charset: 'utf8mb4',
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
});
