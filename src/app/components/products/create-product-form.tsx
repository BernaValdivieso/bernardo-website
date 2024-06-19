"use client";

import React, { ChangeEvent, useState } from "react";
import { Product } from "@/domain/entities/product.entity";
import { createProductGateway } from "@/gateways/products/create-product.gateway";

type ProductFormProps = {};

const ProductForm: React.FC<ProductFormProps> = ({}) => {
  const [formData, setFormData] = useState<Omit<Product, "productId">>({
    name: "",
    description: "",
    price: 0,
    isAvailable: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "isAvailable" ? value === "true" : value, // Handle boolean conversion for isAvailable
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdProduct = await createProductGateway({ product: formData });
      // Reset form data after successful creation
      setFormData({
        name: "",
        description: "",
        price: 0,
        isAvailable: false,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Create Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-white text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-white text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label
              htmlFor="isAvailable"
              className="block text-white text-sm font-bold mb-2"
            >
              Available
            </label>
            <select
              id="isAvailable"
              name="isAvailable"
              value={formData.isAvailable ? "true" : "false"}
              onChange={handleChange}
              className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
