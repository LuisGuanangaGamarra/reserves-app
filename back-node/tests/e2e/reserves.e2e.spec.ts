import request from "supertest";
import express from "express";
import { configureMiddleware } from "../../src/infrastructure/api-server/middlewares/configure-middleware";
import { configureRoutes } from "../../src/infrastructure/api-server/routes/configure-routes.route";
import { bootstrapContainer } from "../../src/infrastructure/di/container";

describe("Reserves E2E", () => {
    let app: express.Express;

    beforeAll(async () => {
        const container = await bootstrapContainer();
        app = express();
        configureMiddleware(app);
        configureRoutes(app, container);
    });

    it("GET /api/reserves/:id valida schema (id inválido)", async () => {
        const res = await request(app).get("/api/reserves/abc");
        expect(res.status).toBe(400);
        expect(res.body.code).toBe("ERROR_VALIDATION");
    });

    it("POST /api/reserves rechaza sin CSRF", async () => {
        const res = await request(app).post("/api/reserves").send({ eventId: 1, seatNumbers: [1] });
        expect(res.status).toBe(403);
    });

    it("POST /api/reserves crea con CSRF y retorna 201", async () => {
        const tokenResp = await request(app).get("/api/csrf-token");
        expect(tokenResp.status).toBe(200);
        // @ts-ignore
        const csrfCookie = tokenResp.headers["set-cookie"]?.find((c: string) => c.includes("csrf-token"));
        const token = tokenResp.body.token;

        const res = await request(app)
            .post("/api/reserves")
            .set("Cookie", csrfCookie)
            .set("X-CSRF-Token", token)
            .send({ eventId: 1, seatNumbers: [1, 2] });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("totalPrice");
        expect(res.body.event).toHaveProperty("id", 1);
    });

    it("GET /api/reserves/get-by-event-id/:id devuelve reservas del evento", async () => {
        const res = await request(app).get("/api/reserves/get-by-event-id/1");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});