import { injectable, inject } from "inversify";

import {
    IReserveRepository,
    TokenReserveRepository
} from "../../domain/repositories/reserve.repository";

import { ReserveAggregate } from "../../domain/aggregates/reserve.aggregate";
import { IEventRepository, TokenEventRepository } from "../../domain/repositories/event.repository";
import {DomainException} from "../../domain/exceptions/domain.exception";

@injectable()
export class SaveReserveUseCase {
    constructor(
        @inject(TokenReserveRepository)
        private readonly reserveRepository: IReserveRepository,
        @inject(TokenEventRepository)
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(reserveData: ReserveAggregate): Promise<ReserveAggregate> {
        const eventId = reserveData.eventId
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new DomainException('event_not_found', 'Event not found', { eventId }, 404);
        }

        const validSeatNumbers = new Set(
            event.location.seats.map(seat => Number(seat.seatNumber))
        );

        const invalidSeats = reserveData.seatNumbers.filter(
            seatNumber => !validSeatNumbers.has(seatNumber)
        );

        if (invalidSeats.length > 0) {
            throw new DomainException(
                'invalid_seat_number',
                'Los asientos a reservar no existen en para ese evento',
                { invalidSeats }
            );
        }

        const reservedSeats = new Set(
            event.reserves.flatMap(r => r.seatNumbers.map(Number))
        );

        const alreadyReserved = reserveData.seatNumbers.filter(
            seatNumber => reservedSeats.has(seatNumber)
        );

        if (alreadyReserved.length > 0) {
            throw new DomainException(
                'seat_already_reserved',
                'Alguno o algunos asientos ya fueron reservados',
                { alreadyReserved }
            );
        }

        return await this.reserveRepository.save(reserveData);
    }
}