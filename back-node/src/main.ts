import express from "express";
import dotenv from "dotenv";
import { Container } from "inversify";
import http from "http";

import { bootstrapContainer } from "./infrastructure/di/container";
import { configureMiddleware } from "./infrastructure/api-server/middlewares/configure-middleware";
import { configureRoutes } from "./infrastructure/api-server/routes/configure-routes.route";
import { ILogger, TokenLogger } from "./application/ILogger";
import { DataSource } from "typeorm";
import { TokenDataSource } from "./infrastructure/persistence/typeorm/data-source";

dotenv.config({
    path: ["/etc/secrets/.env", "./.env"],
    quiet: true,
});

const PORT = process.env.PORT || 3000;
const app = express();
let container: Container;
let server: http.Server | null = null;

async function bootstrap() {
    try {
        container = await bootstrapContainer();
        configureMiddleware(app);
        configureRoutes(app, container);

        const logger: ILogger = container.get<ILogger>(TokenLogger);

        server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        process.on("uncaughtException", (err) => {
            logger.error("Uncaught Exception", err);
            shutdown(logger);
        });

        process.on("unhandledRejection", (reason) => {
            logger.error("Unhandled Promise Rejection", reason);
            shutdown(logger);
        });

        process.on("SIGTERM", () => shutdown(logger));
        process.on("SIGINT", () => shutdown(logger));
    } catch (error) {
        console.error("Error during app bootstrap:", error);
        process.exit(1);
    }
}

async function shutdown(logger?: ILogger) {
    try {
        logger?.info("Gracefully shutting down server...");

        if (server) {
            await new Promise<void>((resolve) => server!.close(() => resolve()));
            logger?.info("HTTP server closed.");
        }

        if (container && container.isBound(TokenDataSource)) {
            const dataSource = container.get<DataSource>(TokenDataSource);
            if (dataSource.isInitialized) {
                await dataSource.destroy();
                logger?.info("Database connection closed.");
            }
        }

        logger?.info("Application terminated successfully.");
        process.exit(0);
    } catch (err) {
        logger?.error("Error during shutdown", err);
        process.exit(1);
    }
}

bootstrap();
