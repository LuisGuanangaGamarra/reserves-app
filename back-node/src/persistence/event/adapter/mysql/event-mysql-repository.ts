import { EventEntity } from "../../event-entity";
import { EventRepository } from "../../event-repository";

export class EventMysqlRepository implements EventRepository {
  findAll(): Promise<EventEntity[]> {
    /**
     * TODO: Completar la función para que devuelva todos los eventos
     */

    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<EventEntity | null> {
    /**
     * TODO: Completar la función para que devuelva el evento con el id indicado
     */

    throw new Error("Method not implemented.");
  }
}
