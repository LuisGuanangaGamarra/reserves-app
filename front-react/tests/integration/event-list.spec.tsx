import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { EventList } from "../../src/feature/event-list";
import { http } from "../../src/api/axios.client";
import type { AxiosResponse } from "axios";

jest.mock("../../src/api/axios.client", () => {
    return {
        http: {
            get: jest.fn(),
        },
    };
});

describe("EventList (integración)", () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    });

    it("muestra listado cuando la API responde", async () => {
        (http.get as jest.Mock).mockResolvedValue({
            data: [
                { id: 1, name: "Show A", date: new Date().toISOString(), price: 10, location: "X", hasAvailableSeats: true },
                { id: 2, name: "Show B", date: new Date().toISOString(), price: 20, location: "Y", hasAvailableSeats: false },
            ],
        } as AxiosResponse);

        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <EventList />
                </BrowserRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByRole("link", { name: /Show A/i })).toBeInTheDocument();
        });
        expect(screen.getByText(/Show B/i)).toBeInTheDocument();
    });

    it("muestra estado vacío cuando no hay eventos", async () => {
        (http.get as jest.Mock).mockResolvedValueOnce({ data: [] } as AxiosResponse);

        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <EventList />
                </BrowserRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByRole("heading", { name: /Eventos/i })).toBeInTheDocument();
        });

        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
});