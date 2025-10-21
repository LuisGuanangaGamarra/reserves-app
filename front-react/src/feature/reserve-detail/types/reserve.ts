export interface Reserve {
  id: string;
  seats: number[];
  event: {
    name: string;
    date: string;
  };
}
