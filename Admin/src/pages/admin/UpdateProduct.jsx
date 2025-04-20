import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";


const UpdateProduct = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('product_id');

    const [productData, setProductData] = useState({
        name: "",
        category: "",
        costPrice: "",
        salePrice: "",
        discount: "",
        stockQuantity: "",
        description: "",
        productImage: "",
    });

    const [categories, setCategories] = useState([]);
    
    // for fatch category name
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/Category/get-all");
                const data = await res.json();
                if (res.ok) {
                    setCategories(data.categories); // ✅ Check if this key matches your backend response
                } else {
                    toast.error(data.message || "Failed to load categories");
                }
            } catch (error) {
                toast.error("Error fetching categories");
            }
        };
    
        fetchCategories();
    }, []);

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
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

    const validateField = (name, value) => {
        if (!value && typeof value === "string") return "This field is required.";
        if (name === "name" && (value.length < 3 || /^\d+$/.test(value))) {
            return "Product name must be at least 3 characters and not be a number.";
        }
        if (["costPrice", "salePrice", "discount", "stockQuantity"].includes(name)) {
            if (isNaN(value) || value < 0) return "Enter a valid non-negative number.";
        }
        if (name === "discount" && (value < 1 || value > 100)) {
            return "Discount must be between 1% and 100%.";
        }
        if (name === "salePrice" && parseFloat(value) < parseFloat(productData.costPrice)) {
            return "Sale price can't be less than cost price.";
        }
        if (name === "stockQuantity" && !Number.isInteger(Number(value))) {
            return "Stock quantity must be an integer.";
        }
        return null;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData((prev) => ({ ...prev, productImage: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        for (let key in productData) {
            const error = validateField(key, productData[key]);
            if (error) formErrors[key] = error;
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

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
            setSubmitting(true);
            await axios.put(`http://localhost:5000/api/Product/update-product/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        
            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/admin/products");
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update product.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error("Error updating product:", error);
        } finally {
            setSubmitting(false);
        }
        
    };

    return (
        <div>
            <h1 className="mt-4">Update Product</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item active">Update Product</li>
            </ol>

            {loading ? <p>Loading...</p> : (
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input type="text" className="form-control" name="name" value={productData.name} onChange={handleChange} />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Discount (%)</label>
                                    <input type="number" className="form-control" name="discount" value={productData.discount} onChange={handleChange} />
                                    {errors.discount && <small className="text-danger">{errors.discount}</small>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Cost Price</label>
                                    <input type="number" className="form-control" name="costPrice" value={productData.costPrice} onChange={handleChange} />
                                    {errors.costPrice && <small className="text-danger">{errors.costPrice}</small>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Sale Price</label>
                                    <input type="number" className="form-control" name="salePrice" value={productData.salePrice} onChange={handleChange} />
                                    {errors.salePrice && <small className="text-danger">{errors.salePrice}</small>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Stock Quantity</label>
                                    <input type="number" className="form-control" name="stockQuantity" value={productData.stockQuantity} onChange={handleChange} />
                                    {errors.stockQuantity && <small className="text-danger">{errors.stockQuantity}</small>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Category</label>
                                    <select className="form-select" name="category" value={productData.category} onChange={handleChange}>
                                        <option value="" disabled>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                    </select>
                                    {errors.category && <small className="text-danger">{errors.category}</small>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" name="description" value={productData.description} onChange={handleChange} rows="4"></textarea>
                                {errors.description && <small className="text-danger">{errors.description}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Product Image</label>
                                <input type="file" className="form-control" name="productImage" onChange={handleFileChange} />
                                {preview && (
                                    <img src={preview} alt="Preview" className="mt-2" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ccc' }} />
                                )}
                                {errors.productImage && <div className="text-danger">{errors.productImage}</div>}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? "Updating..." : "Update Product"}
                            </button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin/products")}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
