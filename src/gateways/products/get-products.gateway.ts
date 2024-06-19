import { Product } from "@/domain/entities/product.entity";

export const getProductsGateway = async (): Promise<Product[]> => {
  const result = await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.json();
};
