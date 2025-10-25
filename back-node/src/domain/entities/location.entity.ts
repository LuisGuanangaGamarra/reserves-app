import { SeatEntity } from "./seat.entity";
import { ID } from "../value-object/id.vo";

export class LocationEntity {
    constructor(
        public readonly id: ID,
        public readonly name: string,
        public readonly address: string,
        public readonly seats: SeatEntity[],
    ) {
    }
}