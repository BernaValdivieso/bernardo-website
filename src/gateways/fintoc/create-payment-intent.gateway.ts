import { PaymentIntent } from "@/domain/entities/payment-intent";

export const createPaymentIntentGateway = async ({
  amount,
}: {
  amount: number;
}): Promise<PaymentIntent> => {
  const result = await fetch("/fintoc/payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  return result.json();
};
