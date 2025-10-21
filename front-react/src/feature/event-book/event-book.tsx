import style from "./event-book.module.css";
import { Layout } from "../../components/layout";
import { BookButton, SeatList, SeatListItem, Screen } from "./components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Event } from "./types";
import { service } from "./service";

export const EventBook = () => {
  const maxSeats = 32;
  const navigate = useNavigate();
  const { eventId } = useParams<"eventId">();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!eventId) {
      return;
    }

    service.getEventById(eventId).then((event) => {
      setEvent(event);
    });
  }, [eventId]);

  const submit = () => {
    if (!eventId) {
      return;
    }

    service
      .book({
        eventId: eventId,
        selectedSeats: [], // TODO: Enviar asientos seleccionados a reservar
      })
      .then(({ reserveId }) => {
        navigate(`/reserve/${reserveId}`);
      });
  };

  const computeAmount = () => {
    /**
     * TODO: Calcular el monto total de los asientos seleccionados
     */
    return 0;
  };

  if (!event) {
    /**
     * TODO: Mostrar un spinner mientras se carga el evento
     */
    return null;
  }

  return (
    <Layout>
      <Link className={style.back} to="..">
        Atrás
      </Link>

      <h1 className={style.title}>{event.name}</h1>
      <p className={style.date}>
        {
          /**
           * TODO: Mostrar la fecha en formato "DD/MM/YYYY HH:mm"
           * Para esto se puede usar cualquier libreria de manejo de fechas
           */
          event.date
        }
      </p>

      <Screen />
      <SeatList>
        {Array.from({ length: maxSeats }, (_, idx) => idx + 1).map((number) => {
          /**
           * TODO: Agregar logica para marcar y desmarcar los asientos a reservar
           * Para esto se debe agregar o quitar la propiedad isSelected al componente SeatListItem
           * creando un estado que guarde los asientos seleccionados usando el evento onClick
           * del componente SeatListItem
           */

          /**
           * TODO: Agregar regla comercial de que solo se pueden
           * seleccionar máximo 4 asientos por reserva
           */

          const isReserved = event.reservedSeats.indexOf(number) !== -1;

          return (
            <SeatListItem
              key={number}
              number={number}
              isReserved={isReserved}
            />
          );
        })}
      </SeatList>
      <BookButton amount={computeAmount().toString()} onClick={submit} />
    </Layout>
  );
};
