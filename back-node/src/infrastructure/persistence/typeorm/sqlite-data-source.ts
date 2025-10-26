import { DataSource } from "typeorm";
import path from "path";

export const SqLiteDataSource = () => (
    new DataSource({
        type: 'better-sqlite3',
        database: ':memory:',
        synchronize: false,
        logging: ["error"],
        logger: 'formatted-console',
        entities: [
            path.resolve(__dirname, `./entities/*.orm-entity{.ts,.js}`),
        ],
        migrations: [ path.resolve(__dirname, `./migrations-sqlite/*{.ts,.js}`)],
        migrationsTableName: 'migrations',
    })
)