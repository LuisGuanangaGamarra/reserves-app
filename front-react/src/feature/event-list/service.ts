import { Event } from "./types";
import { http } from '../../api/axios.client.ts';

export const service = {
  getEvents: async (): Promise<Event[]> => {
      return (await http.get<Event[]>("/events")).data;
  },
};
