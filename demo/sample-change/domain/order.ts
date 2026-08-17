export interface Order {
  id: string;
  totalCents: number;
  currency: string;
}

export interface PaymentResult {
  paymentId: string;
  status: "authorized" | "declined";
}
