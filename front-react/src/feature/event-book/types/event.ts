export interface Seat {
    id: number;
    seatNumber: number;
    status: "available" | "reserved";
}

export interface EventDetail {
    id: number;
    name: string;
    date: string;
    price: number;
    location: string;
    seats: Seat[];
}

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