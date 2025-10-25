import { doubleCsrf } from "csrf-csrf";

import { Request, Response, NextFunction } from "express";

const isProduction = process.env.NODE_ENV === "production";
const cookieName = isProduction ? "__Host-csrf-token" : "csrf-token";
const enableHttps = process.env.ENABLE_HTTPS === "true";

export const {
    invalidCsrfTokenError,
    generateCsrfToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || '',
    getSessionIdentifier: (req) => {
        return req.ip ?? 'anonymous';
    },
    cookieName: cookieName,
    cookieOptions: {
        httpOnly: false,
        sameSite: isProduction ? "none" : "lax",
        secure: enableHttps,
        path: "/",
    },
    size: 64,
});

export function ensureCsrfCookie(req: Request, res: Response, next: NextFunction) {

    const hasCookie = Boolean(req.cookies[cookieName]);

    if (!isProduction && !hasCookie) {
        const token = generateCsrfToken(req, res);
        req.headers["x-csrf-token"] = token;
        req.cookies[cookieName] = token;
    }

    if (!isProduction && hasCookie && !req.headers["x-csrf-token"]) {
        const cookieValue = req.cookies[cookieName];
        if (cookieValue) {
            req.headers["x-csrf-token"] = cookieValue;
        }
    }

    if (isProduction && !hasCookie) {
        generateCsrfToken(req, res);
    }

    next();
}