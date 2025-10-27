import { DataSource } from 'typeorm';
import * as path from 'path';

const isSSL = process.env.DB_SSL === 'true';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: isSSL ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: ['error'],
    logger: 'file',
    entities: [
        path.resolve(__dirname, `./entities/*.orm-entity{.ts,.js}`),
    ],
    migrations: [ path.resolve(__dirname, `./migrations/*{.ts,.js}`)],
    migrationsTableName: 'migrations'
})

export const TokenDataSource = Symbol.for('DataSource');