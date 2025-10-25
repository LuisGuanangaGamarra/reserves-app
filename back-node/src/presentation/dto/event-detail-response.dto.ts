export type SeatView = {
    id: number;
    seatNumber: number;
    status: 'available' | 'reserved';
}

export class EventDetailResponseDto {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly date: string,
        public readonly price: number,
        public readonly location: string,
        public readonly seats: SeatView[],
    ) {
    }
}