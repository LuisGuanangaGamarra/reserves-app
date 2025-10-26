import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import cookieParser from "cookie-parser";

import { globalRateLimiter } from "./rate-limit.middleware";

export const configureMiddleware = (app: Express) => {
    app.set(
        'trust proxy',
        process.env.NODE_ENV === 'production' ? 1 : false,
    );

    app.use(cors({
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Requested-With"],
    }));

    app.use(helmet({
        contentSecurityPolicy: false,
        crossOriginOpenerPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }));

    app.use(globalRateLimiter);

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};