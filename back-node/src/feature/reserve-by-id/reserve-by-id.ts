type Response = {
  id: string;
  seats: number[];
  event: {
    id: string;
    name: string;
    date: string;
  };
};

export function ReserveById() {
  return async (id: string): Promise<Response | null> => {
    /**
     * TODO: Completar la función para que devuelva la reserva
     */
    throw new Error("Not implemented");
  };
}
