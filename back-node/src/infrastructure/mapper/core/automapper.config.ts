import { createMapper, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export const mapper: Mapper = createMapper({
    strategyInitializer: classes(),
});

export const TokenMapper = Symbol.for('Mapper');