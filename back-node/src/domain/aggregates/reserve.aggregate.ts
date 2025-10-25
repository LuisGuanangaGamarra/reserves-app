import { ID } from "../value-object/id.vo";

export class ReserveAggregate {
    constructor(
        public readonly id: ID,
        public readonly eventId: number,
        public readonly seatNumbers: number[],
        public readonly createdAt: Date,
    ) {}
}