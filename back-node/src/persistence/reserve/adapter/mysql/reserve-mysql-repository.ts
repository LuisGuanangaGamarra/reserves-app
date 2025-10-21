import { ReserveEntity } from "../../reserve-entity";
import { ReserveRepository } from "../../reserve-repository";

export class ReserveMysqlRepository implements ReserveRepository {
  save(reserve: ReserveEntity): Promise<void> {
    /**
     * TODO: Completar la función para que guarde la reserva
     */

    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ReserveEntity | null> {
    /**
     * TODO: Completar la función para que devuelva la reserva con el id indicado
     */

    throw new Error("Method not implemented.");
  }
  findByEventId(eventId: string): Promise<ReserveEntity[]> {
    /**
     * TODO: Completar la función para que devuelva las reservas del evento indicado
     */

    throw new Error("Method not implemented.");
  }
}
