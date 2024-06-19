"use client";
import { createPaymentGateway } from "@/gateways/fintoc/create-payment.gateway";
import React from "react";
import { useState } from "react";

export const FintocSection = () => {
  const [response, setResponse] = useState<any>(null);

  const handleButtonClick = async () => {
    try {
      const response = await createPaymentGateway();
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
        <button onClick={handleButtonClick}>Hacer Petición</button>
        {response && (
          <div>
            <h2>Respuesta:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};
