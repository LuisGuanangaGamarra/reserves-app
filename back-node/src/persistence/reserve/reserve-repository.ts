import { ReserveEntity } from "./reserve-entity";

export interface ReserveRepository {
  save(reserve: ReserveEntity): Promise<void>;
  findById(id: string): Promise<ReserveEntity | null>;
  findByEventId(eventId: string): Promise<ReserveEntity[]>;
}
