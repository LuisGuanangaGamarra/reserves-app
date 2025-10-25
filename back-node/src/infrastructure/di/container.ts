import { Container } from 'inversify';
import { DataSource } from 'typeorm';

import { CoreModule } from './core.module';
import { EventModule } from './event.module';
import { ReserveModule } from "./reserve.module";
import { AppDataSource, TokenDataSource } from "../persistence/typeorm/data-source";

export async function bootstrapContainer(): Promise<Container> {
    const container = new Container();

    const dataSource = await AppDataSource.initialize();

    container.bind<DataSource>(TokenDataSource).toConstantValue(dataSource);

    await container.load(CoreModule, EventModule, ReserveModule);

    return container;
}