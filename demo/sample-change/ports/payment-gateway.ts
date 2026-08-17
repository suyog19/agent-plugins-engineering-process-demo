import type { Order, PaymentResult } from "../domain/order";

export interface PaymentGateway {
  authorize(order: Order): Promise<PaymentResult>;
}
