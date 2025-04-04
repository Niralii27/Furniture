import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    // const { productId } = useParams();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get('product_id');
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        costPrice: "",
        salePrice: "",
        discount: "",
        stockQuantity: "",
        description: "",
        productImage: "", // Store the uploaded image URL or file
    });

    const [preview, setPreview] = useState(null); // To preview the selected image
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            setLoading(true);
            axios
                .get(`http://localhost:5000/api/Product/view-product/${productId}`)
                .then((response) => {
                    setProductData(response.data);
                    setPreview(response.data.productImage ? `http://127.0.0.1:5000/public/uploads/${response.data.productImage}` : null);
                })
                .catch((error) => {
                    console.error("Error fetching product data:", error);
                    alert("Error fetching product data");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [productId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData((prevData) => ({
                ...prevData,
                productImage: file, // Store the file in state
            }));
            setPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("category", productData.category);
        formData.append("costPrice", productData.costPrice);
        formData.append("salePrice", productData.salePrice);
        formData.append("discount", productData.discount);
        formData.append("stockQuantity", productData.stockQuantity);
        formData.append("description", productData.description);

        if (typeof productData.productImage === 'object') {
            formData.append("productImage", productData.productImage);
        }

        try {
            await axios.put(`http://localhost:5000/api/Product/update-product/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            alert("Failed to update product");
            console.error("Error updating product:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="form-container">
            <h2>Edit Product</h2>
            {loading ? (
                <p>Loading product data...</p>
            ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleChange}
                                value={productData.name}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Category</label>
                            <select
                                name="category"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleChange}
                                value={productData.category}
                            >
                                <option value="">Select Category</option>
                                <option value="Chair">Chair</option>
                                <option value="Table">Table</option>
                                <option value="Sofa">Sofa</option>
                                <option value="Bed">Bed</option>
                                <option value="Cabinet">Cabinet</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Cost Price</label>
                            <input
                                type="number"
                                name="costPrice"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleChange}
                                value={productData.costPrice}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Sale Price</label>
                            <input
                                type="number"
                                name="salePrice"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleChange}
                                value={productData.salePrice}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleChange}
                                value={productData.discount}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Stock Quantity</label>
                            <input
                                type="number"
                                name="stockQuantity"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleChange}
                                value={productData.stockQuantity}
                            />
                        </div>

                        {/* Product Image Upload */}
                        <div>
                            <label className="block mb-2 text-sm text-amber-800">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                                onChange={handleFileChange}
                            />
                            {preview && (
                                <img src={preview} alt="Preview" className="mt-2 w-32 h-32 border object-cover" />
                            )}
                        </div>

                        {/* Description field - using full width */}
                    </div>
                    
                    <div className="mt-4">
                        <label className="block mb-2 text-sm text-amber-800">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full px-4 py-2 border rounded-md border-amber-800 focus:ring-blue-500"
                            onChange={handleChange}
                            value={productData.description}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full mt-4 px-4 py-2 text-white bg-amber-800 rounded-md hover:bg-white hover:text-amber-800 border border-amber-800"
                    >
                        {submitting ? "Updating..." : "Update"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate("/admin/products")} 
                        className="w-full mt-2 px-4 py-2 text-amber-800 bg-white rounded-md hover:bg-amber-800 hover:text-white border border-amber-800"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateProduct;