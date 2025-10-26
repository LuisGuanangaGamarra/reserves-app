import { injectable, inject } from "inversify";

import {
    IReserveRepository,
    TokenReserveRepository
} from "../../domain/repositories/reserve.repository";

import { ReserveAggregate } from "../../domain/aggregates/reserve.aggregate";

@injectable()
export class GetReservesByEventIdUseCase {
    constructor(
        @inject(TokenReserveRepository)
        private readonly reserveRepository: IReserveRepository,
    ) {}

    async execute(eventID: number): Promise<ReserveAggregate[]> {
        return await this.reserveRepository.findByEventId(eventID);
    }
}