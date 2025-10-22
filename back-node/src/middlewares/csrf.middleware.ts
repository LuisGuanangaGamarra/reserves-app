import { doubleCsrf } from "csrf-csrf";

import { Request, Response, NextFunction } from "express";

export const {
    invalidCsrfTokenError,
    generateCsrfToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || '',
    getSessionIdentifier: (req) => {
        return req.ip ?? 'anonymous';
    },
    cookieName: "__Host-csrf-token",
    cookieOptions: {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    },
    size: 64,
});

export function ensureCsrfCookie(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies["__Host-csrf-token"]) {
        generateCsrfToken(req, res);
    }
    next();
}
