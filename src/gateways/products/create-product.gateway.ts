import { Product } from "@/domain/entities/product.entity";

export const createProductGateway = async ({
  product,
}: {
  product: Omit<Product, "productId">;
}): Promise<Product> => {
  const body = product;

  const result = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return result.json();
};
