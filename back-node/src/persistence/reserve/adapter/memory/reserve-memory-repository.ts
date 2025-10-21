import { ReserveEntity } from "../../reserve-entity";
import { ReserveRepository } from "../../reserve-repository";

export class ReserveMemoryRepository implements ReserveRepository {
  static memoryReserves: ReserveEntity[] = [
    {
      id: "1",
      eventId: "1",
      seats: [10, 11],
    },
    {
      id: "2",
      eventId: "1",
      seats: [12, 13],
    },
  ];

  async save(reserve: ReserveEntity): Promise<void> {
    ReserveMemoryRepository.memoryReserves.push(reserve);
  }

  async findById(id: string): Promise<ReserveEntity | null> {
    const reserve = ReserveMemoryRepository.memoryReserves.find(
      (reserve) => reserve.id === id
    );
    return reserve ?? null;
  }

  async findByEventId(eventId: string): Promise<ReserveEntity[]> {
    return ReserveMemoryRepository.memoryReserves.filter(
      (reserve) => reserve.eventId === eventId
    );
  }
}
