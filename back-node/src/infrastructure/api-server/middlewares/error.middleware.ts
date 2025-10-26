import { Request, Response, NextFunction } from "express";

import { DomainException } from "../../../domain/exceptions/domain.exception";
import { invalidCsrfTokenError } from "./csrf.middleware";
import { ILogger } from "../../../application/ILogger";

export function createErrorMiddleware(logger: ILogger) {
    return function errorMiddleware(
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (err instanceof DomainException) {
            logger.debug(`DomainException [${err.code}]: ${err.message}`, {
                context: err.context,
                path: req.path,
            });

            return res.status(err.statusCode ?? 400).json(err);
        }

        if (err === invalidCsrfTokenError) {
            logger.debug("CSRF token inválido o ausente", { path: req.path });

            return res.status(403).json({
                code: "CSRF_TOKEN_INVALID",
                message: "Token CSRF inválido o ausente",
            });
        }

        const isError = err instanceof Error;
        const message = isError ? err.message : "Error interno inesperado";

        logger.error(`Unhandled error: ${message}`, {
            path: req.path,
            stack: isError ? err.stack : undefined,
        });

        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message,
            context: {
                ...(process.env.NODE_ENV === "development" && isError
                    ? { stack: err.stack }
                    : {}),
            },
        });
    };
}
