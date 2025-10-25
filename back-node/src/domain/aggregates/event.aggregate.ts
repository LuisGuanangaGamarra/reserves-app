import { LocationEntity } from '../entities/location.entity';
import { ReserveAggregate } from './reserve.aggregate';
import { ID } from "../value-object/id.vo";

export class EventAggregate {
    constructor(
        public readonly id: ID,
        public readonly name: string,
        public readonly date: Date,
        public readonly price: number,
        public readonly location: LocationEntity,
        public readonly reserves: ReserveAggregate[] = [],
    ) {
    }
}