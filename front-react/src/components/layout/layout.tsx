import style from "./layout.module.css";

export const Layout = (props: { children?: React.ReactNode }) => {
  return <div className={style.container}>{props.children}</div>;
};
