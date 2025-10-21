import { Event } from "./types";

export const service = {
  getEvents: async (): Promise<Event[]> => {
    /**
     * TODO: Reemplazar por llamada a backend
     */

    return [
      {
        id: "1",
        name: "Event 1",
        date: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Event 2",
        date: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Event 3",
        date: new Date().toISOString(),
      },
    ];
  },
};
