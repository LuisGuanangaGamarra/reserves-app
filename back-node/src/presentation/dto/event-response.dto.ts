export class EventResponseDto {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly date: string,
        public readonly price: number,
        public readonly location: string,
        public readonly hasAvailableSeats: boolean,
    ) {
    }
}