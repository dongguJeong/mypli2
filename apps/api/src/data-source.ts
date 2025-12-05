// apps/api/src/typeorm.config.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/migrations/*.js'],
  charset: 'utf8mb4',
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
});
