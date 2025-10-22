import express, { Request, Response, NextFunction, Errback } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { globalRateLimiter } from "./middlewares/rate-limit.middleware";
import { ensureCsrfCookie, doubleCsrfProtection, invalidCsrfTokenError } from "./middlewares/csrf.middleware";

import eventsRoute from "./routes/events.route";
import reservesRoute from "./routes/reserve.route";

dotenv.config({
    path: ["/etc/secrets/.env", "./.env"],
    quiet: true,
});

const app = express();

app.set(
    'trust proxy',
    process.env.NODE_ENV === 'production' ? 1 : false,
);

app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(globalRateLimiter);

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ensureCsrfCookie);

app.use(doubleCsrfProtection);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use("/events", eventsRoute);
// app.use("/reserve", reservesRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err === invalidCsrfTokenError) {
        return res.status(403).json({ message: "Token CSRF inválido o ausente" });
    }
    next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on ${PORT}`),
);
