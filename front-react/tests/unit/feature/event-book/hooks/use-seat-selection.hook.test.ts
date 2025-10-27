import { renderHook, act } from "@testing-library/react";
import { useSeatSelection } from "../../../../../src/feature/event-book/hooks/use-seat-selection.hook";
import type { EventDetail } from "../../../../../src/feature/event-book/types";

const eventMock: EventDetail = {
    id: 1,
    name: "Test",
    date: new Date().toISOString(),
    price: 10,
    location: "X",
    seats: [
        { id: 1, seatNumber: 1, status: "available" },
        { id: 2, seatNumber: 2, status: "reserved" },
        { id: 3, seatNumber: 3, status: "available" },
        { id: 4, seatNumber: 4, status: "available" },
    ],
};

describe("useSeatSelection", () => {
    it("agrega y quita asientos respetando el máximo y reservados", () => {
        const { result, rerender } = renderHook(
            ({ ev, max }) => useSeatSelection({ event: ev, maxSeats: max }),
            { initialProps: { ev: eventMock, max: 2 } }
        );

        act(() => result.current.toggleSeat(1));
        expect(result.current.selectedSeats).toEqual([1]);

        act(() => result.current.toggleSeat(2));
        expect(result.current.selectedSeats).toEqual([1]);

        act(() => result.current.toggleSeat(3));
        expect(result.current.selectedSeats).toEqual([1, 3]);

        act(() => result.current.toggleSeat(4));
        expect(result.current.selectedSeats).toEqual([1, 3]);

        act(() => result.current.toggleSeat(1));
        expect(result.current.selectedSeats).toEqual([3]);

        rerender({ ev: { ...eventMock, id: 2 }, max: 2 });
        expect(result.current.selectedSeats).toEqual([]);
    });
});