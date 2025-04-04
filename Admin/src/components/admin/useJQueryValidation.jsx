import React, { useEffect } from "react";
import useJQueryValidation from "./useJQueryValidation";

const ProductForm = () => {
  const rules = {
    name: {
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    category: {
      required: true,
    },
    costPrice: {
      required: true,
      number: true,
      min: 0,
    },
    salePrice: {
      required: true,
      number: true,
      min: 0,
    },
    discount: {
      required: true,
      number: true,
      min: 0,
      max: 100,
    },
    stockQuantity: {
      required: true,
      digits: true,
      min: 0,
    },
    productImage: {
      required: true,
      imageMimes: true,
      filesize: 200000, // 200 KB
    },
    description: {
      required: true,
      minlength: 10,
    },
  };

  const messages = {
    name: {
      required: "Product name is required",
      minlength: "Name must be at least 3 characters",
      maxlength: "Name can't exceed 50 characters",
    },
    category: {
      required: "Please select a category",
    },
    costPrice: {
      required: "Cost price is required",
      number: "Please enter a valid number",
      min: "Cost price cannot be negative",
    },
    salePrice: {
      required: "Sale price is required",
      number: "Please enter a valid number",
      min: "Sale price cannot be negative",
    },
    discount: {
      required: "Discount is required",
      number: "Please enter a valid percentage",
      min: "Discount cannot be less than 0%",
      max: "Discount cannot exceed 100%",
    },
    stockQuantity: {
      required: "Stock quantity is required",
      digits: "Please enter a valid whole number",
      min: "Stock can't be negative",
    },
    productImage: {
      required: "Product image is required",
    },
    description: {
      required: "Description is required",
      minlength: "Description must be at least 10 characters",
    },
  };

  useJQueryValidation("productForm", rules, messages);

  return (
    <form id="productForm" className="space-y-4" encType="multipart/form-data">
      <input name="name" placeholder="Product Name" className="input" />
      <select name="category" className="input">
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <input name="costPrice" type="number" placeholder="Cost Price" className="input" />
      <input name="salePrice" type="number" placeholder="Sale Price" className="input" />
      <input name="discount" type="number" placeholder="Discount (%)" className="input" />
      <input name="stockQuantity" type="number" placeholder="Stock Quantity" className="input" />
      <input name="productImage" type="file" className="input" />
      <textarea name="description" placeholder="Description" className="input" />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default ProductForm;
