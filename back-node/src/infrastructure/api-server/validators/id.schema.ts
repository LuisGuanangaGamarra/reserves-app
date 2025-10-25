import { Schema } from "express-validator";

export const IdSchema: Schema = {
    id: {
        in: ["params"],
        isInt: {
            options: { min: 1 },
            errorMessage: "El ID debe ser un número entero positivo",
        },
        toInt: true,
    },
};