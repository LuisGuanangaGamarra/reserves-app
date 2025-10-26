import winston, { Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { injectable } from "inversify";
import fs from 'fs';

import { ILogger } from '../../application/ILogger';

const isProduction = process.env.NODE_ENV === 'production';

const logDir = path.join(__dirname, '../../../logs');

if (isProduction && !fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.printf(({ level, message, timestamp, context }) => {
    const contextStr = context ? `\n  context: ${JSON.stringify(context, null, 2)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
});

const transports: winston.transport[] = [
    new winston.transports.Console({
        level: isProduction ? 'info' : 'debug',
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
        ),
    }),
];

if (isProduction) {
    transports.push(
        new DailyRotateFile({
            dirname: logDir,
            filename: 'app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
            level: 'error',
        })
    );
}

@injectable()
export class WinstonLogger implements ILogger {
    private loggerInstance: Logger
    constructor() {
        this.loggerInstance = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            ),
            transports,
        });
    }

    info(message: string, context?: unknown): void {
        this.loggerInstance.info(message, { context });
    }
    warn(message: string, context?: unknown): void {
        this.loggerInstance.warn(message, { context });
    }
    error(message: string, context?: unknown): void {
        this.loggerInstance.error(message, { context });
    }
    debug(message: string, context?: unknown): void {
        this.loggerInstance.debug(message, { context });
    }
}
