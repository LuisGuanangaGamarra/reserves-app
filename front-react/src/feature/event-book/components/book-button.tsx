import style from "./book-button.module.css";

export const BookButton = (props: { amount: string; onClick?: () => void }) => {
  return (
    <div className={style.container}>
      <button className={style.button} onClick={() => props.onClick?.()}>
        <div className={style.amount}>$ {props.amount}</div>
        <div className={style.label}>Reservar</div>
      </button>
    </div>
  );
};
