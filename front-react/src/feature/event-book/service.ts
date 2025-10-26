import { EventDetail, ReserveDetailResponseDto } from "./types";
import { http } from '../../api/axios.client.ts';

export const service = {
  async getEventById(id: number): Promise<EventDetail> {
      return (await http.get<EventDetail>(`/events/${id}`)).data;
  },

  async book(props: {
    eventId: number;
    selectedSeats: number[];
  }): Promise<ReserveDetailResponseDto> {
      const { data } = await http.post<ReserveDetailResponseDto>(
          `/reserves`,
          {
              eventId: props.eventId,
              seatNumbers: props.selectedSeats,
          },
      );
      return data;
  },
};
