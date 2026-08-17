export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "requires_capture" | "requires_payment_method";
}

export class StripeClient {
  async createPaymentIntent(input: {
    amount: number;
    currency: string;
  }): Promise<StripePaymentIntent> {
    return {
      id: "pi_demo_123",
      amount: input.amount,
      currency: input.currency,
      status: "requires_capture",
    };
  }
}
