import { ReserveRepository } from "../../persistence/reserve";
import { v4 as uuidv4 } from "uuid";

type Request = {
  seats: number[];
  eventId: string;
};

type Response = {
  id: string;
};

export function ReserveSave(props: { reserveRepository: ReserveRepository }) {
  return async (request: Request): Promise<Response> => {
    const id = uuidv4();

    await props.reserveRepository.save({
      id,
      seats: request.seats,
      eventId: request.eventId,
    });

    return { id };
  };
}
