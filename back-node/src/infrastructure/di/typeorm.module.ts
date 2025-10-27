import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { DataSource } from 'typeorm';

import { AppDataSource } from '../persistence/typeorm/data-source';
import { SqLiteDataSource } from '../persistence/typeorm/sqlite-data-source';
import { TokenDataSource } from '../persistence/typeorm/data-source';

const isSqlite = process.env.DB_TYPE === 'sqlite';

export const TypeOrmModule = new ContainerModule(async (options: ContainerModuleLoadOptions) => {
    const ds = isSqlite ? SqLiteDataSource() : AppDataSource();

    if (!ds.isInitialized) {
        await ds.initialize();
        if (isSqlite) {
            await ds.runMigrations();
        }
    }

    options.bind<DataSource>(TokenDataSource)
        .toConstantValue(ds)
});