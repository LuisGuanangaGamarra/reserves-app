import { Link, useParams } from "react-router-dom";
import style from "./reserve-detail.module.css";
import { Layout } from "../../components/layout";
import { BookQR } from "./components";
import { useEffect, useState } from "react";
import { Reserve } from "./types";
import { service } from "./service";

export const ReserveDetail = () => {
  const { bookingId } = useParams<"bookingId">();
  const [reserve, setReserve] = useState<Reserve | null>(null);

  useEffect(() => {
    if (!bookingId) {
      return;
    }

    service.getReserveById(bookingId).then((reserve) => setReserve(reserve));
  }, [bookingId]);

  if (!reserve) {
    /**
     * TODO: Mostrar un spinner mientras se carga el la reserva
     */
    return null;
  }

  return (
    <Layout>
      <Link className={style.back} to="/">
        Inicio
      </Link>

      <div className={style.content}>
        <h1 className={style.title}>¡Reserva exitosa!</h1>

        <h2 className={style.eventName}>{reserve.event.name}</h2>
        <p className={style.eventDate}>{reserve.event.date}</p>

        <h3 className={style.reserveTitle}>Reserva</h3>
        <p className={style.reserveId}>{reserve.id}</p>

        <h3 className={style.seatsTitle}>Asientos</h3>
        <p className={style.seatsNumbers}>{reserve.seats.join(",")}</p>

        <BookQR />
      </div>
    </Layout>
  );
};
