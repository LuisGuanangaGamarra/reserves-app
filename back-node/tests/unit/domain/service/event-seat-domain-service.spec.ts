import { EventSeatDomainService } from "../../../../src/domain/services/event-seat.service";

describe("EventSeatDomainService", () => {
    it("debería marcar como reserved los asientos ya tomados", () => {
        const event: any = {
            location: { seats: [{ id: 1, seatNumber: 1 }, { id: 2, seatNumber: 2 }] },
            reserves: [{ seatNumbers: [2] }],
        };
        const res = EventSeatDomainService.getAllSeatsWithStatus(event);
        expect(res).toEqual([
            { id: 1, seatNumber: 1, status: "available" },
            { id: 2, seatNumber: 2, status: "reserved" },
        ]);
    });

    it("debería retornar vacío si no hay ubicación", () => {
        const event: any = { location: null, reserves: [] };
        expect(EventSeatDomainService.getAllSeatsWithStatus(event)).toEqual([]);
    });
});