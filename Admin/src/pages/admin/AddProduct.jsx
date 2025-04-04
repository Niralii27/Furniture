import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        costPrice: "",
        salePrice: "",
        discount: "",
        stockQuantity: "",
        description: "",
        productImage: null,
    });

    const [errors, setErrors] = useState({});

    const categories = [
        { id: "1", name: "Chair" },
        { id: "2", name: "Table" },
        { id: "3", name: "Flower Pot" },
        { id: "4", name: "Bed" },
        { id: "5", name: "Sofa" },
    ];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === "file" ? files[0] : value;
        setFormData({ ...formData, [name]: newValue });

        const error = validateField(name, newValue);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        if (!value || (typeof value === "string" && value.trim() === "")) {
            return `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        }

        if (name === "name" && (value.length < 3 || /^\d+$/.test(value))) {
            return "Product name must be at least 3 characters long and not a number.";
        }

        if (["discount", "costPrice", "salePrice", "stockQuantity"].includes(name) && (isNaN(value) || value < 0)) {
            return "Must be a valid non-negative number.";
        }

        if (name === "discount" && (value < 1 || value > 100)) {
            return "Discount must be between 1% and 100%.";
        }

        if (name === "salePrice" && formData.costPrice && parseFloat(value) < parseFloat(formData.costPrice)) {
            return "Sale price cannot be less than cost price.";
        }

        if (name === "stockQuantity" && !Number.isInteger(Number(value))) {
            return "Stock quantity must be a whole number.";
        }

        if (name === "productImage" && value) {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(value.type)) {
                return "Only JPG, PNG, and GIF formats are allowed.";
            }
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        if (formData.profilePic) {
            formDataToSend.append("uploads", formData.profilePic);
          }

          

        try {
            const response = await fetch("http://localhost:5000/api/Product/add-product", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                setFormData({
                    name: "",
                    category: "",
                    costPrice: "",
                    salePrice: "",
                    discount: "",
                    stockQuantity: "",
                    description: "",
                    productImage: null,
                });
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <br />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Add New Product</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link> / <Link to="/admin/products">Products</Link> / Add Product
                </nav>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Product Details */}
                        <h5 className="mb-3">Product Details</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" />
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-danger">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Pricing & Discount */}
                        <h5 className="mb-3">Pricing & Discount</h5>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Cost Price</label>
                                <input type="number" className="form-control" name="costPrice" value={formData.costPrice} onChange={handleChange} placeholder="Enter cost price" />
                                {errors.costPrice && <p className="text-danger">{errors.costPrice}</p>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Sale Price</label>
                                <input type="number" className="form-control" name="salePrice" value={formData.salePrice} onChange={handleChange} placeholder="Enter sale price" />
                                {errors.salePrice && <p className="text-danger">{errors.salePrice}</p>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Discount (%)</label>
                                <input type="number" className="form-control" name="discount" value={formData.discount} onChange={handleChange} placeholder="Enter discount" />
                                {errors.discount && <p className="text-danger">{errors.discount}</p>}
                            </div>
                        </div>

                        {/* Stock & Description */}
                        <h5 className="mb-3">Stock & Description</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Stock Quantity</label>
                                <input type="number" className="form-control" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} placeholder="Enter stock quantity" />
                                {errors.stockQuantity && <p className="text-danger">{errors.stockQuantity}</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product Image</label>
                                <input type="file" className="form-control" name="productImage" onChange={handleChange} />
                                {errors.productImage && <p className="text-danger">{errors.productImage}</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter product description"></textarea>
                            {errors.description && <p className="text-danger">{errors.description}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
