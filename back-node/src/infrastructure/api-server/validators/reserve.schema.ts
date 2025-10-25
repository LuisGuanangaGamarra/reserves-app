import { Schema } from 'express-validator';

export const CreateReserveSchema: Schema = {
    eventId: {
        in: ['body'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'El ID del evento debe ser un número entero positivo',
        },
        toInt: true,
    },

    seatNumbers: {
        in: ['body'],
        isArray: {
            options: { min: 1 },
            errorMessage: 'Debe proporcionar al menos un número de asiento',
        },
        custom: {
            options: (value: unknown) => {
                if (!Array.isArray(value)) return false;
                return value.every(
                    (n) => typeof n === 'number' && Number.isInteger(n) && n > 0,
                );
            },
            errorMessage:
                'Todos los números de asiento deben ser enteros positivos',
        },
    },
};
