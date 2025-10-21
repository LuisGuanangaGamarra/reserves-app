import style from "./screen.module.css";

export const Screen = () => {
  return (
    <div className={style.container}>
      <div className={style.screen} />
      <div className={style.help}>Escena</div>
    </div>
  );
};
