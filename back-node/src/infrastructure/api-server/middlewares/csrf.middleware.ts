import { doubleCsrf } from "csrf-csrf";

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
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: enableHttps,
        path: "/",
    },
    size: 64,
});
