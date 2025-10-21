import { EventRepository } from "../../persistence/event";
import { ReserveRepository } from "../../persistence/reserve";

type Response = {
  id: string;
  name: string;
  date: string;
  price: number;
  reservedSeats: number[];
};

export function EventById(props: {
  eventRepository: EventRepository;
  reserveRepository: ReserveRepository;
}) {
  return async (id: string): Promise<Response | null> => {
    const event = await props.eventRepository.findById(id);
    if (!event) {
      return null;
    }

    const reserves = await props.reserveRepository.findByEventId(id);
    const reservedSeats = reserves.flatMap((reserve) => reserve.seats);

    return {
      id: event.id,
      name: event.name,
      date: event.date,
      price: event.price,
      reservedSeats: reservedSeats,
    };
  };
}
