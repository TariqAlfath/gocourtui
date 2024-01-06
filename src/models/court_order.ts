export interface CourtOrder {
  idOrder: number;
  rentStart?: Date | null;
  rentEnd?: Date | null;
  estimatedPrice?: number | null;
  renter?: string | null;
  catatan?: string | null;
  isBuy: boolean | null;
  idUser?: string | null;
  createdAt?: Date | null;
}
