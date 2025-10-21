import { Reserve } from "./types";

export const service = {
  async getReserveById(id: string): Promise<Reserve> {
    /**
     * TODO: Reemplazar por llamada a backend
     */
    return {
      id: id,
      seats: [11, 12, 13],
      event: {
        name: "Event 1",
        date: new Date().toISOString(),
      },
    };
  },
};
