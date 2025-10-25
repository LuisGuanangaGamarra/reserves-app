import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: "Demasiadas solicitudes desde esta IP. Intenta de nuevo más tarde.",
    },
});