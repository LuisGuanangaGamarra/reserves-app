export class ReserveRequestDto {
    constructor(
        public readonly eventId: number,
        public readonly seatNumbers: number[],
    ) {
    }
}