import style from "./event-list.module.css";
import { Layout } from "../../components/layout";
import { ItemList, ItemListRow } from "./components";
import { service } from "./service";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/spinner";

export const EventList = () => {
    const { data: events, isLoading, error } = useQuery({
        queryKey: ["events"],
        queryFn: () => service.getEvents(),
    });

    if (error) {
        return (
            <Layout>
                <p>Error al cargar los eventos</p>
            </Layout>
        )
    }

  return (
    <Layout>
        <h1 className={style.title}>Eventos</h1>
        {isLoading ? (
            <Spinner />
        ) : (
            <ItemList>
                {(events ?? []).map((event) => (
                    <ItemListRow
                        key={event.id}
                        to={`/events/${event.id}/book`}
                        name={event.name}
                        date={event.date}
                    />
                ))}
            </ItemList>
        )}
    </Layout>
  );
};
