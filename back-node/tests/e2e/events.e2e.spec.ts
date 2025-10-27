import request from "supertest";
import express from "express";
import { configureMiddleware } from "../../src/infrastructure/api-server/middlewares/configure-middleware";
import { configureRoutes } from "../../src/infrastructure/api-server/routes/configure-routes.route";
import { bootstrapContainer } from "../../src/infrastructure/di/container";

describe("Events E2E", () => {
    let app: express.Express;

    beforeAll(async () => {
        const container = await bootstrapContainer();
        app = express();
        configureMiddleware(app);
        configureRoutes(app, container);
    });

    it("GET /api/events retorna lista", async () => {
        const res = await request(app).get("/api/events");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty("id");
            expect(res.body[0]).toHaveProperty("hasAvailableSeats");
        }
    });

    it("GET /api/events/:id con id inválido devuelve 400", async () => {
        const res = await request(app).get("/api/events/xyz");
        expect(res.status).toBe(400);
        expect(res.body.code).toBe("ERROR_VALIDATION");
    });

    it("GET /api/events/:id inexistente devuelve 404 domain error", async () => {
        const res = await request(app).get("/api/events/999999");
        expect(res.status).toBe(404);
        expect(res.body.code).toBe("event_not_found");
    });
});