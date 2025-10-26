import { injectable, inject } from "inversify";

import { IReserveRepository, TokenReserveRepository } from "../../domain/repositories/reserve.repository";
import { DomainException } from "../../domain/exceptions/domain.exception";

@injectable()
export class GetReserveByIdUseCase {
    constructor(
        @inject(TokenReserveRepository)
        private readonly reserveRepository: IReserveRepository
    ) {}

    async execute(id: number) {
        const reserve = await this.reserveRepository.findById(id);
        if (!reserve) {
            throw new DomainException('reserve_not_found', 'Reserve not found', { id }, 404);
        }

        return reserve;
    }
}