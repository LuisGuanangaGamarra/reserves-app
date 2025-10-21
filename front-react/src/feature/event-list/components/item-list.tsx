import style from "./item-list.module.css";
import { Link } from "react-router-dom";

export const ItemList = (props: { children?: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <ul className={style.list}>{props.children}</ul>
    </div>
  );
};

export const ItemListRow = (props: {
  to: string;
  name: string;
  date: string;
}) => {
  return (
    <li className={style.item}>
      <Link className={style.item_link} to={props.to}>
        <div className={style.item_name}>{props.name}</div>
        <div className={style.item_date}>
          {
            /**
             * TODO: Mostrar la fecha en formato "DD/MM/YYYY HH:mm"
             * Para esto se puede usar cualquier libreria de manejo de fechas
             */
            props.date
          }
        </div>
      </Link>
    </li>
  );
};
