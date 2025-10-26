import React from "react";
import styles from "./spinner.module.css";

type SpinnerProps = {
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: React.CSSProperties;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", className, style }) => {
    const cls = [styles.spinner, styles[size]].filter(Boolean).join(" ");
    return (
        <div className={styles.container}>
            <div className={className ? `${cls} ${className}` : cls} style={style} />
        </div>
    );
};