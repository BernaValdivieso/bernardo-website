"use client";
import { createPaymentIntentGateway } from "@/gateways/fintoc/create-payment-intent.gateway";
import React, { useState } from "react";
import FintocWidget from "./fintoc-widget";

export const FintocSection = () => {
  const [amount, setAmount] = useState<number>(0);
  const [response, setResponse] = useState<any>(null);

  const username = "41614850-3";
  const password = "jonsnow";

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleButtonClick = async () => {
    try {
      const response = await createPaymentIntentGateway({ amount });
      console.log("response: ", response);
      setResponse(response);
    } catch (error) {
      console.error("Error al hacer la petición:", error);
    }
  };

  return (
    <>
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Prueba con Fintoc
      </h2>
      <div className="flex flex-row justify-center items-center gap-2 text-white my-6">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Ingrese el monto"
          className="border rounded px-2 py-1 text-black bg-white"
        />
        <button onClick={handleButtonClick}>Hacer Petición</button>
      </div>
      {response && (
        <div className="text-white">
          <h2>Respuesta:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      <div className="text-white my-6">
        <h3>Datos del usuario:</h3>
        <p>Username: {username}</p>
        <p>Password: {password}</p>
      </div>
      <FintocWidget widgetToken={response?.widget_token} />
    </>
  );
};
