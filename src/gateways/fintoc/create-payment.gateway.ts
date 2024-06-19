export const createPaymentGateway = async (): Promise<unknown> => {
  const payment_intent = {
    amount: 1000,
    currency: "clp",
    customer_email: "name@example.com",
  };

  const result = await fetch("/fintoc/payment_intents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "sk_test_WdxDkx_TgLuooetb6C-9Z3aSsDNcQGjJ",
    },
    body: JSON.stringify(payment_intent),
  });

  return result.json();
};
