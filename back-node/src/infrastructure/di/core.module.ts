import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { TokenLogger, ILogger } from "../../application/ILogger";
import { WinstonLogger } from "../logger/winston-logger";
import { mapper, TokenMapper } from '../mapper/core/automapper.config';

export const CoreModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    options.bind(TokenMapper)
        .toConstantValue(mapper);

    options.bind<ILogger>(TokenLogger).to(WinstonLogger)
        .inSingletonScope();
});