import { EventRepository, EventEntity } from "../../persistence/event";

export function EventList(props: { eventRepository: EventRepository }) {
  return async (): Promise<EventEntity[]> => {
    return await props.eventRepository.findAll();
  };
}
