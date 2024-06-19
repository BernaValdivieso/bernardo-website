import { Product } from "@/domain/entities/product.entity";

export const deleteProductGateway = async ({
  productId,
}: {
  productId: string;
}): Promise<void> => {
  await fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
