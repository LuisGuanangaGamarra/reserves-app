import style from "./event-book.module.css";
import { Layout } from "../../components/layout";
import { BookButton, SeatList, SeatListItem, Screen } from "./components";
import { Link, useNavigate, useParams } from "react-router-dom";

import { service } from "./service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatToLocalTime } from "../../utils/date-format.util.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../components/spinner";
import { useSeatSelection } from "./hooks/use-seat-selection.hook";

export const EventBook = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<"eventId">();
  const queryClient = useQueryClient();

  const { data: event, isLoading, error } = useQuery({
      queryKey: ["event", eventId],
      queryFn: () => service.getEventById(Number(eventId)),
      enabled: !!eventId,
  });

  const { selectedSeats, toggleSeat } = useSeatSelection({ event, maxSeats: 4 });

  const { mutateAsync: doBook, isPending } = useMutation({
      mutationFn: (payload: { eventId: number; selectedSeats: number[] }) =>
          service.book(payload),
      onSuccess: async ({ id }) => {
          await queryClient.invalidateQueries({ queryKey: ["events"] });
          await queryClient.invalidateQueries({ queryKey: ["event", eventId] });
          navigate(`/reserve/${id}`);
      },
  });


  const submit = () => {
      if (!event) return;
      if (selectedSeats.length === 0) return;
      doBook({ eventId: Number(eventId), selectedSeats });
  };

  const computeAmount = () => {
      return (event?.price ?? 0) * selectedSeats.length;
  };

  if ((isLoading || !event) && !error) {
      return (
          <Layout>
              <Spinner />
          </Layout>
      );
  }

    if (error) {
        return (
            <Layout>
                <p>Error al cargar el evento</p>
            </Layout>
        );
    }

  return (
    <Layout>
      <Link className={style.back} to="..">
        Atrás
      </Link>

      <h1 className={style.title}>{event.name}</h1>
      <p className={style.date}>
        { formatToLocalTime(event.date) }
      </p>

      <Screen />
      <SeatList>
        {event.seats?.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatNumber);
          const isReserved = seat.status === "reserved";

          return (
            <SeatListItem
                key={seat.seatNumber}
                number={seat.seatNumber}
                isReserved={isReserved}
                isSelected={isSelected}
                onClick={toggleSeat}
            />
          );
        })}
      </SeatList>
      <BookButton amount={computeAmount().toString()} onClick={isPending ? undefined : submit} />
    </Layout>
  );
};
