import { EventAggregate } from '../aggregates/event.aggregate';
import { SeatView } from "../entities/seat.entity";

export class EventSeatDomainService {
    static getAllSeatsWithStatus(event: EventAggregate): SeatView[] {
        const reservedSeatNumbers = new Set(
            event.reserves.flatMap((r) => r.seatNumbers.map(Number)),
        );

        const allSeats = event?.location?.seats?.map((seat) => {
            const status = reservedSeatNumbers.has(seat.seatNumber)
                ? 'reserved'
                : 'available';
            return {
                id: seat.id,
                seatNumber: seat.seatNumber,
                status,
            } as SeatView;
        }) ?? [];

        return allSeats.sort((a, b) => a.seatNumber - b.seatNumber);
    }
}