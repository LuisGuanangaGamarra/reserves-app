export interface EventSummary {
    id: number;
    name: string;
    date: string;
    price: number;
    location: string;
}

export interface ReserveDetailResponseDto {
    id: number;
    seats: number[];
    totalPrice: number;
    event: EventSummary;
}
