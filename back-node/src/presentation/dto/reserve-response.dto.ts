export type SeatReserveView = {
    id: number;
    name: string;
    date: string;
    price: number;
    location: string;
}

export class ReserveResponseDto {
    constructor(
        public readonly id: number,
        public seats: number[],
        public totalPrice: number,
        public readonly event: SeatReserveView,
    ) {
    }
}