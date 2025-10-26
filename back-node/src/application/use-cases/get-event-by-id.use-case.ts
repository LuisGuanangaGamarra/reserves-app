import { injectable, inject } from "inversify";

import { IEventRepository, TokenEventRepository } from "../../domain/repositories/event.repository";
import { DomainException } from "../../domain/exceptions/domain.exception";

@injectable()
export class GetEventByIdUseCase {
    constructor(
        @inject(TokenEventRepository)
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(id: number) {
       const event = await this.eventRepository.findById(id);
       if (!event) {
           throw new DomainException('event_not_found', 'Event not found', { id }, 404);
       }

       return event;
    }
}