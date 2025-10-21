import { reserveMemoryRepository } from "../../persistence/reserve/adapter/memory";
import { eventMemoryRepository } from "../../persistence/event/adapter/memory";
import { EventById } from "./event-by-id";

export const eventById = EventById({
  eventRepository: eventMemoryRepository,
  reserveRepository: reserveMemoryRepository,
});
