import { EventEntity } from "./event-entity";

export interface EventRepository {
  findAll(): Promise<EventEntity[]>;
  findById(id: string): Promise<EventEntity | null>;
}
