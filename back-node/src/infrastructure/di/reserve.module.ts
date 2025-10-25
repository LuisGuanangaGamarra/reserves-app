import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { addProfile } from "@automapper/core";

import { IReserveRepository, TokenReserveRepository } from "../../domain/repositories/reserve.repository";
import { ReserveRepositoryOrm } from "../persistence/typeorm/repositories/reserve.repository-orm";

import { mapper } from '../mapper/core/automapper.config';
import { ReserveProfile } from "../mapper/reserve/reserve.profile";
import { GetReserveByIdUseCase } from "../../application/use-cases/get-reserve-by-id.use-case";
import { SaveReserveUseCase } from "../../application/use-cases/save-reserve.use-case";


export const ReserveModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    options.bind<IReserveRepository>(TokenReserveRepository)
        .to(ReserveRepositoryOrm)
        .inSingletonScope();

    options.bind<GetReserveByIdUseCase>(GetReserveByIdUseCase)
        .to(GetReserveByIdUseCase)
        .inTransientScope()

    options.bind<SaveReserveUseCase>(SaveReserveUseCase)
        .to(SaveReserveUseCase)
        .inTransientScope()

    addProfile(mapper, ReserveProfile);
})
