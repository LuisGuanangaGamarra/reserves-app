import { ID } from "../value-object/id.vo";

export class SeatEntity {
    constructor(
        public readonly id: ID,
        public readonly seatNumber: number,
    ) {
    }
}

export interface SeatView {
    id: ID;
    seatNumber: number;
    status: 'available' | 'reserved';
}