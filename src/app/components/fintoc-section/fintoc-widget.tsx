"use client";

import React, { useState } from "react";
import { getFintoc } from "@fintoc/fintoc-js";

type FintocWidgetProps = {
  publicKey?: string; // Puedes hacerlos opcionales para tener valores por defecto
  holderType?: "business" | "individual";
  product?: "movements" | "subscriptions" | "invoices" | "payments";
  widgetToken?: string;
  onSuccess?: () => void;
  onExit?: () => void;
  onEvent?: () => void;
};

const FintocWidget: React.FC<FintocWidgetProps> = ({
  publicKey = "pk_test_CiqqLN7nx916zq1KP9Y-kRBRvbwZzGEQ",
  holderType = "individual",
  product = "payments",
  widgetToken = "pi_NoY1VZSZnopL14xB_sec_9Q6nyiLzWKb6SMQvrWip3Nzh",
  onSuccess,
  onExit,
  onEvent,
}) => {
  const [loading, setLoading] = useState(false);

  const openWidget = async () => {
    try {
      setLoading(true);
      const Fintoc = await getFintoc();
      const widget = Fintoc?.create({
        publicKey,
        holderType,
        product,
        widgetToken,
        onSuccess,
        onExit,
        onEvent,
      });
      widget?.open();
    } catch (error) {
      console.error("Error opening Fintoc widget:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={openWidget}
      className="px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white"
      disabled={loading}
    >
      {loading ? "Opening..." : "Open Fintoc Widget"}
    </button>
  );
};

export default FintocWidget;
