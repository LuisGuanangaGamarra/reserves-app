import { eventMemoryRepository } from "../../persistence/event/adapter/memory";
import { EventList } from "./event-list";

export const eventList = EventList({ eventRepository: eventMemoryRepository });
