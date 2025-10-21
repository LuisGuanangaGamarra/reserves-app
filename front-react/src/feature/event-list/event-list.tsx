import style from "./event-list.module.css";
import { Layout } from "../../components/layout";
import { ItemList, ItemListRow } from "./components";
import { Event } from "./types";
import { useEffect, useState } from "react";
import { service } from "./service";

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    service.getEvents().then((events) => setEvents(events));
  }, []);

  return (
    <Layout>
      <h1 className={style.title}>Eventos</h1>
      <ItemList>
        {events.map((event) => (
          <ItemListRow
            key={event.id}
            to={`/events/${event.id}/book`}
            name={event.name}
            date={event.date}
          />
        ))}
      </ItemList>
    </Layout>
  );
};
