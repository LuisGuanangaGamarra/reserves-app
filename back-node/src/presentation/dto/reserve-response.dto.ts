export type SeatReserveView = {
    id: number;
    name: string;
    date: string;
}

export class ReserveResponseDto {
    constructor(
        public readonly id: number,
        public seats: number[],
        public readonly event: SeatReserveView,
    ) {
    }
}