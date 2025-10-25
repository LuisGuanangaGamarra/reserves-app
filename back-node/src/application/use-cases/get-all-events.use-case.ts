import { injectable, inject } from "inversify";
import { IEventRepository, TokenEventRepository } from "../../domain/repositories/event.repository";

@injectable()
export class GetAllEventsUseCase {
    constructor(
        @inject(TokenEventRepository)
        private readonly eventRepository: IEventRepository
    ) {}

    execute() {
        return this.eventRepository.findAll();
    }
}