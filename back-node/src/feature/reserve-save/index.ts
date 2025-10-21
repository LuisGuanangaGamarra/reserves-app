import { reserveMemoryRepository } from "../../persistence/reserve/adapter/memory";
import { ReserveSave } from "./reserve-save";

export const reserveSave = ReserveSave({
  reserveRepository: reserveMemoryRepository,
});
