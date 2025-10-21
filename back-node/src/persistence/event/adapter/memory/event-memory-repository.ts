import { EventEntity } from "../../event-entity";
import { EventRepository } from "../../event-repository";

export class EventMemoryRepository implements EventRepository {
  static memoryEvents: EventEntity[] = [
    {
      id: "1",
      name: "Event 1",
      date: new Date().toISOString(),
      price: 100,
    },
    {
      id: "2",
      name: "Event 2",
      date: new Date().toISOString(),
      price: 200,
    },
    {
      id: "3",
      name: "Event 3",
      date: new Date().toISOString(),
      price: 300,
    },
  ];

  async findAll(): Promise<EventEntity[]> {
    return EventMemoryRepository.memoryEvents;
  }

  async findById(id: string): Promise<EventEntity | null> {
    const event = EventMemoryRepository.memoryEvents.find(
      (event) => event.id === id
    );
    return event ?? null;
  }
}
