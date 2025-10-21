import { Event } from "./types";

export const service = {
  async getEventById(id: string): Promise<Event> {
    /**
     * TODO: Reemplazar por llamada a backend
     */
    return {
      id: id,
      name: `Event ${id}`,
      date: new Date().toISOString(),
      price: 100,
      reservedSeats: [2, 3, 12, 13, 22, 23, 26, 27],
    };
  },

  async book(props: {
    eventId: string;
    selectedSeats: number[];
  }): Promise<{ reserveId: string }> {
    /**
     * TODO: Reemplazar por llamada a backend
     */
    console.log("book", props);
    return { reserveId: "f9zL5w" };
  },
};
