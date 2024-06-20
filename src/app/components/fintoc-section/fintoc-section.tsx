"use client";

import { createPaymentIntentGateway } from "@/gateways/fintoc/create-payment-intent.gateway";
import React, { useState } from "react";
import { FintocWidget } from "./fintoc-widget";

export const FintocSection = () => {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const [widgetToken, setWidgetToken] = useState<string | undefined>(undefined);

  const username = "41614850-3";
  const password = "jonsnow";
  const authCode = "000000";

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await createPaymentIntentGateway({ amount });
      console.log("response: ", response);
      setWidgetToken(response?.widget_token);
      setRequestSuccess(true);
    } catch (error) {
      console.error("Error al hacer la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 mt-14 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Fintoc Demo</h2>
      <p className="text-[#ADB7BE] text-lg mb-6 lg:text-xl">
        In this section a fake payment attempt is made with Fintoc. The widget
        they make available is used along with a backend connection that can be
        reviewed in the projects section above.
      </p>
      <label htmlFor="amountInput" className="text-white">
        Enter the amount to charge:
      </label>
      <div className="flex justify-center items-center gap-2 text-white my-6">
        <input
          type="number"
          id="amountInput"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter the amount"
          className="border rounded px-4 py-2 text-black bg-white focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-center items-center gap-2 text-white my-6">
        <button
          className={`px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "Request Payment"}
        </button>
      </div>
      {requestSuccess && (
        <div className="text-white my-6">
          <h2>Request successful:</h2>
          <p>The request was generated successfully!</p>
          <div className="text-white my-6">
            <h3>Use the following user data for the demo:</h3>
            <p>Username: {username}</p>
            <p>Password: {password}</p>
            <p>Auth Code: {authCode}</p>
          </div>
        </div>
      )}
      {requestSuccess && widgetToken !== undefined && (
        <FintocWidget widgetToken={widgetToken} />
      )}
    </div>
  );
};
