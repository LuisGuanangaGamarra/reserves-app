import { Container } from 'inversify';

import { CoreModule } from './core.module';
import { EventModule } from './event.module';
import { ReserveModule } from "./reserve.module";
import { TypeOrmModule } from "./typeorm.module";

export async function bootstrapContainer(): Promise<Container> {
    const container = new Container();

    await container.load(TypeOrmModule);

    await container.load(CoreModule, EventModule, ReserveModule);

    return container;
}