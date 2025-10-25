import { ReserveAggregate } from "../aggregates/reserve.aggregate";

export interface IReserveRepository {
    save(reserve: ReserveAggregate): Promise<ReserveAggregate>;
    findById(id: number): Promise<ReserveAggregate | null>;
    findByEventId(eventId: number): Promise<ReserveAggregate[]>;
}

export const TokenReserveRepository = Symbol.for("IReserveRepository");