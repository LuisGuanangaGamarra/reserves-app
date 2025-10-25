import express from "express";
import dotenv from "dotenv";
import { Container } from "inversify";

import { bootstrapContainer } from './infrastructure/di/container';
import { configureMiddleware } from './infrastructure/api-server/middlewares/configure-middleware'
import { configureRoutes } from "./infrastructure/api-server/routes/configure-routes.route";
import { ILogger, TokenLogger } from "./application/ILogger";

dotenv.config({
    path: ["/etc/secrets/.env", "./.env"],
    quiet: true,
});

const PORT = process.env.PORT || 3000;
const app = express();
let container: Container;

async function bootstrap() {
    container = await bootstrapContainer();
    configureMiddleware(app);
    configureRoutes(app, container);
    const logger:ILogger = container.get<ILogger>(TokenLogger);
    app.listen(PORT, () =>
        logger.info(`Server is running on ${PORT}`),
    );
}

bootstrap();
