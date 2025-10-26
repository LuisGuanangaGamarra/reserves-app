import { ReserveDetailResponseDto } from "./types";
import { http } from '../../api/axios.client.ts';

export const service = {
  async getReserveById(id: number): Promise<ReserveDetailResponseDto> {
      return (await http.get<ReserveDetailResponseDto>(`/reserves/${id}`)).data;
  },
};
