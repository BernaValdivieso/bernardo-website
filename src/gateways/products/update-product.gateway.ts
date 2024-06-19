import { Product } from "@/domain/entities/product.entity";

export const updateProductGateway = async ({
  product,
}: {
  product: Product;
}): Promise<Product> => {
  const result = await fetch(`/api/products/${product.productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return result.json();
};
