import style from "./book-qr.module.css";
import { QRCodeSVG } from "qrcode.react";

export const BookQR = (props: { bookingId: string }) => {
    return (
        <div className={style.container}>
            <QRCodeSVG value={props.bookingId} width={150} height={150} />
        </div>
    );
};
