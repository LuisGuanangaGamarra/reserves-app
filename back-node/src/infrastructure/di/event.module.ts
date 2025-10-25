import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { addProfile } from '@automapper/core';

import { TokenEventRepository, IEventRepository } from "../../domain/repositories/event.repository";
import { EventRepositoryOrm } from "../persistence/typeorm/repositories/event.repository-orm";
import { GetAllEventsUseCase } from "../../application/use-cases/get-all-events.use-case";
import { mapper } from '../mapper/core/automapper.config';
import { EventProfile } from "../mapper/event/event.profile";
import { GetEventByIdUseCase } from "../../application/use-cases/get-event-by-id.use-case";


export const EventModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    options.bind<IEventRepository>(TokenEventRepository)
        .to(EventRepositoryOrm)
        .inSingletonScope();


    options.bind<GetAllEventsUseCase>(GetAllEventsUseCase)
        .to(GetAllEventsUseCase)
        .inTransientScope();

    options.bind<GetEventByIdUseCase>(GetEventByIdUseCase)
        .to(GetEventByIdUseCase)
        .inTransientScope()

    addProfile(mapper, EventProfile);
});