import { useCallback, useEffect, useState } from "react";
import type { EventDetail } from "../types";

type UseSeatSelectionParams = {
    event: EventDetail | undefined;
    maxSeats?: number;
};

type UseSeatSelectionReturn = {
    selectedSeats: number[];
    toggleSeat: (n: number) => void;
    clear: () => void;
};

export const useSeatSelection = ({
                                     event,
                                     maxSeats = 4,
                                 }: UseSeatSelectionParams): UseSeatSelectionReturn => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    useEffect(() => {
        setSelectedSeats([]);
    }, [event?.id]);

    const toggleSeat = useCallback(
        (n: number) => {
            if (!event) return;

            const isReserved = event.seats?.some(
                (seat) => seat.seatNumber === n && seat.status === "reserved"
            );
            if (isReserved) return;

            setSelectedSeats((prev) => {
                const exists = prev.includes(n);
                if (exists) return prev.filter((x) => x !== n);
                if (prev.length >= maxSeats) return prev;

                return [...prev, n];
            });
        },
        [event, maxSeats]
    );

    const clear = useCallback(() => setSelectedSeats([]), []);

    return { selectedSeats, toggleSeat, clear };
};