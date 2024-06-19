// products-table.tsx

"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { Product } from "@/domain/entities/product.entity";
import { getProductsGateway } from "@/gateways/products/get-products.gateway";
import { deleteProductGateway } from "@/gateways/products/delete-product.gateway";
import UpdateProductModal from "./update-product-modal"; // Importar el componente del modal de actualización
import { updateProductGateway } from "@/gateways/products/update-product.gateway";

export const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const itemsPerPage = 4;
  const [selectedProductForUpdate, setSelectedProductForUpdate] =
    useState<Product | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Estado para controlar la visibilidad del modal

  const getProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getProductsGateway();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedProducts = async () => {
    setLoading(true);
    try {
      for (const productId of selectedProducts) {
        await deleteProductGateway({ productId });
      }
      // Refresh the products list after deletion
      await getProducts();
      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      console.error("Error deleting products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );

    // Update selected product for update
    const productToUpdate = products.find(
      (product) => product.productId === productId
    );
    setSelectedProductForUpdate(productToUpdate || null);
  };

  const updateProduct = async (updatedProduct: Product) => {
    setLoading(true);
    try {
      await updateProductGateway({ product: updatedProduct });
      await getProducts(); // Recargar productos después de la actualización
      setShowUpdateModal(false); // Cerrar el modal después de completar la actualización
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateButtonClick = () => {
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-white mb-4">Products Table</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
          onClick={getProducts}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load Products"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
          onClick={deleteSelectedProducts}
          disabled={loading || selectedProducts.length === 0}
        >
          {loading ? "Deleting..." : "Delete Selected"}
        </button>
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 ${
            selectedProducts.length !== 1 || loading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleUpdateButtonClick}
          disabled={selectedProducts.length !== 1 || loading}
        >
          Update Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-2 sm:px-4 py-2">Select</th>
              <th className="px-2 sm:px-4 py-2">Product ID</th>
              <th className="px-2 sm:px-4 py-2">Name</th>
              <th className="px-2 sm:px-4 py-2">Description</th>
              <th className="px-2 sm:px-4 py-2">Price</th>
              <th className="px-2 sm:px-4 py-2">Available</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 &&
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="bg-gray-700 text-white">
                  <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                  <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                  <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                  <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                  <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                  <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                </tr>
              ))}
            {currentProducts.map((product) => (
              <tr key={product.productId} className="bg-gray-700 text-white">
                <td className="border px-2 sm:px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                  />
                </td>
                <td className="border px-2 sm:px-4 py-2">
                  {product.productId}
                </td>
                <td className="border px-2 sm:px-4 py-2">{product.name}</td>
                <td className="border px-2 sm:px-4 py-2">
                  {product.description}
                </td>
                <td className="border px-2 sm:px-4 py-2">{product.price}</td>
                <td className="border px-2 sm:px-4 py-2">
                  {product.isAvailable ? "Yes" : "No"}
                </td>
              </tr>
            ))}
            {currentProducts.length < itemsPerPage &&
              Array.from({ length: itemsPerPage - currentProducts.length }).map(
                (_, index) => (
                  <tr key={`empty-${index}`} className="bg-gray-700 text-white">
                    <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                    <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                    <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                    <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                    <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                    <td className="border px-2 sm:px-4 py-2">&nbsp;</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className={`font-bold py-2 px-4 rounded ${
            currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`font-bold py-2 px-4 rounded ${
            currentPage === totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal para actualizar producto */}
      {showUpdateModal && selectedProductForUpdate && (
        <UpdateProductModal
          product={selectedProductForUpdate}
          updateProduct={updateProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductsTable;
