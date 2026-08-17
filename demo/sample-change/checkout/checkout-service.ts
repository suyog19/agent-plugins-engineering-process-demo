import type { Order } from "../domain/order";
import {
  StripeClient,
  type StripePaymentIntent,
} from "../providers/stripe-client";

export class CheckoutService {
  constructor(private readonly stripe: StripeClient) {}

  async placeOrder(order: Order): Promise<StripePaymentIntent> {
    return this.stripe.createPaymentIntent({
      amount: order.totalCents,
      currency: order.currency,
    });
  }
}
