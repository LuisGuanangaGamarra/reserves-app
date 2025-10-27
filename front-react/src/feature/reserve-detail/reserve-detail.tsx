import { Link, useParams } from "react-router-dom";
import style from "./reserve-detail.module.css";
import { Layout } from "../../components/layout";
import { BookQR } from "./components";

import { useQuery } from "@tanstack/react-query";
import { service } from "./service";
import { formatToLocalTime } from "../../utils/date-format.util.ts";
import { Spinner } from "../../components/spinner";

export const ReserveDetail = () => {
  const { bookingId } = useParams<"bookingId">();

  const { data: reserve, isLoading, error } = useQuery({
      queryKey: ["reserve", bookingId],
      queryFn: () => service.getReserveById(Number(bookingId)),
      enabled: !!bookingId,
      staleTime: 0,
      gcTime: 1,
      refetchOnWindowFocus: false,
  });

  if ((isLoading || !reserve) && !error) {
      return (
          <Layout>
              <Spinner />
          </Layout>
      );
  }

  if (error) {
      return (
          <Layout>
              <p>Error al cargar la reserva</p>
          </Layout>
      )
  }

  return (
    <Layout>
      <Link className={style.back} to="/">
        Inicio
      </Link>

      <div className={style.content}>
        <h1 className={style.title}>¡Reserva exitosa!</h1>

        <h2 className={style.eventName}>{reserve.event.name}</h2>
        <p className={style.eventDate}>{formatToLocalTime(reserve.event.date)}</p>

        <h3 className={style.reserveTitle}>Reserva</h3>
        <p className={style.reserveId}>{reserve.id}</p>

        <h3 className={style.seatsTitle}>Asientos</h3>
        <p className={style.seatsNumbers}>{reserve.seats.join(",")}</p>

        <BookQR bookingId={(bookingId ? String(bookingId) : '')} />
      </div>
    </Layout>
  );
};
