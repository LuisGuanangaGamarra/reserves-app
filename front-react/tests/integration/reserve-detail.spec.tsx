import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { ReserveDetail } from "../../src/feature/reserve-detail";
import { http } from "../../src/api/axios.client";

jest.mock("../../src/api/axios.client", () => {
    return {
        http: {
            get: jest.fn(),
            post: jest.fn(),
        },
    };
});

function createWrapper(bookingId: string) {
    return function Wrapper({ children }: { children: React.ReactNode }) {
        const qc = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 0,
                },
            }
        });
        return (
            <QueryClientProvider client={qc}>
                <MemoryRouter initialEntries={[`/reserves/${bookingId}`]}>
                    <Routes>
                        <Route path="/reserves/:bookingId" element={children} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    };
}

describe("ReserveDetail (integración)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("muestra spinner mientras carga y luego la información de la reserva con QR", async () => {
        const nowIso = new Date().toISOString();

        (http.get as jest.Mock).mockResolvedValue({
            data: {
                id: 777,
                seats: [1, 2, 3],
                totalPrice: 30,
                event: {
                    id: 1,
                    name: "Concierto prueba",
                    date: nowIso,
                    price: 10,
                    location: "Teatro X",
                },
            },
        } as AxiosResponse);

        render(<ReserveDetail />, { wrapper: createWrapper("777") });

        expect(screen.getByRole("status")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByRole("heading", { name: "¡Reserva exitosa!" })).toBeInTheDocument();
        });

        expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("heading", { name: "Concierto prueba", level: 2 })).toBeInTheDocument();
        expect(screen.getByText("777")).toBeInTheDocument();
        expect(screen.getByText("1,2,3")).toBeInTheDocument();

        expect(document.querySelector("svg")).toBeTruthy();
    });

    it("muestra mensaje de error cuando el servicio falla", async () => {
        (http.get as jest.Mock).mockRejectedValue(new Error("Error en la solicitud"));

        render(<ReserveDetail />, { wrapper: createWrapper("777") });

        await waitFor(() => {
            expect(screen.getByText("Error al cargar la reserva")).toBeInTheDocument();
        });
    });
});