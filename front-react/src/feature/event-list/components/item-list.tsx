import React from "react";
import style from "./item-list.module.css";
import { Link } from "react-router-dom";
import { formatToLocalTime } from '../../../utils/date-format.util.ts';

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
          { formatToLocalTime(props.date) }
        </div>
      </Link>
    </li>
  );
};
