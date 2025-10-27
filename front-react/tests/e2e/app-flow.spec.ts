import { test, expect } from "@playwright/test";

test("flujo: listar -> seleccionar -> reservar -> ver reserva", async ({ page }) => {
    await page.route("**/api/events", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([
                { id: 1, name: "Show", date: new Date().toISOString(), price: 10, location: "X", hasAvailableSeats: true },
            ]),
        });
    });

    await page.route("**/api/events/1", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                id: 1,
                name: "Show",
                date: new Date().toISOString(),
                price: 10,
                location: "X",
                seats: [{ id: 1, seatNumber: 1, status: "available" }],
            }),
        });
    });

    await page.route("**/api/reserves", async (route) => {
        const json = await route.request().postDataJSON();
        expect(json).toMatchObject({ eventId: 1, seatNumbers: [1] });
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                id: 777,
                seats: [1],
                totalPrice: 10,
                event: { id: 1, name: "Show", date: new Date().toISOString(), price: 10, location: "X" },
            }),
        });
    });

    await page.route("**/api/reserves/777", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                id: 777,
                seats: [1],
                totalPrice: 10,
                event: { id: 1, name: "Show", date: new Date().toISOString(), price: 10, location: "X" },
            }),
        });
    });

    await page.goto("/events");

    await expect(page.getByRole("heading", { name: /Eventos/i })).toBeVisible();

    const link = page.getByRole("link", { name: /Show/i });
    await expect(link).toBeVisible();
    await link.click();

    const seatBtn = page.getByRole("button", { name: "1" });
    await seatBtn.click();

    const bookBtn = page.getByRole("button", { name: /Reservar/i });
    await bookBtn.click();

    await expect(page.getByText(/¡Reserva exitosa!/i)).toBeVisible();
    await expect(page.getByText("777")).toBeVisible();
});