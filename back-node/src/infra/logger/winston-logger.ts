import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

import { ILogger } from '../../application/ILogger';

const isProduction = process.env.NODE_ENV === 'production';

const logDir = path.join(__dirname, '../../../logs');

const logFormat = winston.format.printf(({ level, message, timestamp, context }) => {
    const contextStr = context ? JSON.stringify(context) : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${contextStr}`;
});

const transports: winston.transport[] = [
    new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat
        ),
    })
];

if (isProduction) {
    transports[0] = new DailyRotateFile({
        dirname: logDir,
        filename: 'app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxFiles: '14d',
        level: 'info',
    });
}

const loggerInstance = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports,
});

export class WinstonLogger implements ILogger {
    info(message: string, context?: unknown): void {
        loggerInstance.info(message, { context });
    }
    warn(message: string, context?: unknown): void {
        loggerInstance.warn(message, { context });
    }
    error(message: string, context?: unknown): void {
        loggerInstance.error(message, { context });
    }
    debug(message: string, context?: unknown): void {
        loggerInstance.debug(message, { context });
    }
}
