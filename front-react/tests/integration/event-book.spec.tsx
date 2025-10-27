import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { EventBook } from "../../src/feature/event-book";
import { http } from "../../src/api/axios.client";
import type { AxiosResponse } from "axios";

jest.mock("../../src/api/axios.client", () => {
    return {
        http: {
            get: jest.fn(),
            post: jest.fn(),
        },
    };
});

function Wrapper({ children }: { children: React.ReactNode }) {
    const qc = new QueryClient();
    return (
        <QueryClientProvider client={qc}>
            <MemoryRouter initialEntries={["/events/1/book"]}>
                <Routes>
                    <Route path="/events/:eventId/book" element={children} />
                    <Route path="/reserve/:bookingId" element={
                        <>
                            <div>¡Reserva exitosa!</div>
                            <p>777</p>
                        </>
                    } />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
}

describe("EventBook (integración)", () => {
    beforeEach(() => jest.clearAllMocks());

    it("flujo de selección y reserva", async () => {
        (http.get as jest.Mock).mockResolvedValue({
            data: {
                id: 1,
                name: "Show",
                date: new Date().toISOString(),
                price: 10,
                location: "X",
                seats: [
                    { id: 1, seatNumber: 1, status: "available" },
                    { id: 2, seatNumber: 2, status: "reserved" },
                ],
            },
        } as AxiosResponse);

        (http.post as jest.Mock).mockResolvedValue({
            data: {
                id: 777,
                seats: [1],
                totalPrice: 10,
                event: { id: 1, name: "Show", date: new Date().toISOString(), price: 10, location: "X" },
            },
        } as AxiosResponse);

        window.history.pushState({}, "", "/events/1/book");
        render(<EventBook />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(screen.getByRole("heading")).toBeInTheDocument();
        });

        const seatBtn = screen.getByRole("button", { name: "1" });
        fireEvent.click(seatBtn);

        const bookBtn = screen.getByRole("button", { name: /Reservar/i });
        fireEvent.click(bookBtn);

        await waitFor(() => {
            expect(screen.getByText(/¡Reserva exitosa!/i)).toBeInTheDocument();
            expect(screen.getByText("777")).toBeInTheDocument();
        });
    });
});