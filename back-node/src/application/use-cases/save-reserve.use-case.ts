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
            throw new DomainException('event_not_found', 'Event not found', { eventId });
        }

        const reserved = new Set(
            event.reserves.flatMap(r => r.seatNumbers.map(Number))
        );

        const isReservedSeat = reserveData.seatNumbers.some(seatNumber => reserved.has(seatNumber));

        if (isReservedSeat) {
            throw new DomainException('seat_reserved', 'Seat is reserved', { seatNumbers: reserveData.seatNumbers });
        }

        return await this.reserveRepository.save(reserveData);
    }
}