import style from "./book-qr.module.css";

export const BookQR = () => {
  return (
    <div className={style.container}>{
      /**
       * TODO: Reemplazar el texto por un QR generado a partir del bookingId
       * Para eso se debe recibir el bookingId como prop del componente
       * y utilizar una libreria que genere QRs
       */
      `QR`
    }</div>
  );
};
