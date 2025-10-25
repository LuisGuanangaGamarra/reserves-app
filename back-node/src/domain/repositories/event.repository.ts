import { EventAggregate } from "../aggregates/event.aggregate";

export interface IEventRepository {
    findAll(): Promise<EventAggregate[]>;
    findById(id: number): Promise<EventAggregate | null>;
}

export const TokenEventRepository = Symbol.for("IEventRepository");