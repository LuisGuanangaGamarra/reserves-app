import { Express } from 'express';
import { Container } from "inversify";
import createEventRoute from "./events.route";
import { createErrorMiddleware } from "../middlewares/error.middleware";

import { ILogger, TokenLogger } from "../../../application/ILogger";
import createReserveRoute from "./reserve.route";

export const configureRoutes = (app: Express, container: Container) => {
    const logger:ILogger = container.get<ILogger>(TokenLogger);

    app.use("/events", createEventRoute(container));
    app.use("/reserves", createReserveRoute(container));
    app.use(createErrorMiddleware(logger));
}
