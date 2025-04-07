import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"; 

const AddOrder = () => {
    const navigate = useNavigate(); //redirect on other page
    const [formData, setFormData] = useState({
        userId: "",
        orderDate: "",
        products: [{ productId: "", quantity: 1 }],
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        phone: "",
        shippingCharge: "",
        status: "Pending"
    });

    const [errors, setErrors] = useState({});

    // Dummy Users & Products
    const users = [{ id: "1", name: "User 1" }, { id: "2", name: "User 2" }];
    const products = [{ id: "101", name: "Product 1" }, { id: "102", name: "Product 2" }];

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Product Changes
    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const newProducts = [...formData.products];
        newProducts[index][name] = value;
        setFormData({ ...formData, products: newProducts });
    };

    // Add & Remove Products
    const addProduct = () => setFormData({ ...formData, products: [...formData.products, { productId: "", quantity: 1 }] });
    const removeProduct = (index) => setFormData({ ...formData, products: formData.products.filter((_, i) => i !== index) });

    // Validate Form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.userId) newErrors.userId = "User is required.";
        if (!formData.orderDate) newErrors.orderDate = "Order date is required.";
        formData.products.forEach((product, index) => {
            if (!product.productId) newErrors[`products.${index}.productId`] = "Product is required.";
            if (!product.quantity || product.quantity <= 0) newErrors[`products.${index}.quantity`] = "Quantity must be greater than 0.";
        });
        ["firstName", "lastName", "address", "city", "state", "pinCode", "phone", "shippingCharge"].forEach((field) => {
            if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:5000/api/admin/add-order", formData);
    
                if (response.status === 201) {
                    Swal.fire({
                        title: 'Success!',
                        text: response.data.message || 'Order added successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate("/admin/orders"); // redirect after success
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.error || 'Something went wrong.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.error || "Failed to add order. Please try again.",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    

    return (
        <div className="container mt-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Add New Order</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link> / <Link to="/admin/orders">Orders</Link> / Add Order
                </nav>
            </div>

            {/* Form Start */}
            <form onSubmit={handleSubmit}>

                {/* Order Information */}
                <div className="card p-4 mb-4">
                    <h4>Order Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">User</label>
                            <select className="form-select" name="userId" value={formData.userId} onChange={handleChange}>
                                <option value="">Select User</option>
                                {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                            </select>
                            {errors.userId && <small className="text-danger">{errors.userId}</small>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Order Date</label>
                            <input type="date" className="form-control" name="orderDate" value={formData.orderDate} onChange={handleChange} />
                            {errors.orderDate && <small className="text-danger">{errors.orderDate}</small>}
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="card p-4 mb-4">
                    <h4>Products</h4>
                    {formData.products.map((product, index) => (
                        <div key={index} className="row mb-3">
                            <div className="col-md-5">
                                <label className="form-label">Product</label>
                                <select className="form-select" name="productId" value={product.productId} onChange={(e) => handleProductChange(index, e)}>
                                    <option value="">Select Product</option>
                                    {products.map(prod => <option key={prod.id} value={prod.id}>{prod.name}</option>)}
                                </select>
                                {errors[`products.${index}.productId`] && <small className="text-danger">{errors[`products.${index}.productId`]}</small>}
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">Quantity</label>
                                <input type="number" className="form-control" name="quantity" min="1" value={product.quantity} onChange={(e) => handleProductChange(index, e)} />
                                {errors[`products.${index}.quantity`] && <small className="text-danger">{errors[`products.${index}.quantity`]}</small>}
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="button" className="btn btn-danger" onClick={() => removeProduct(index)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addProduct}>+ Add Product</button>
                </div>

                {/* Shipping Details */}
                <div className="card p-4 mb-4">
                    <h4>Shipping Details</h4>
                    <div className="row">
                        {["firstName", "lastName", "address", "city", "state", "pinCode", "phone"].map((field, index) => (
                            <div key={index} className={`col-md-${field === "address" ? "12" : "6"} mb-3`}>
                                <label className="form-label">{field.replace(/([A-Z])/g, " $1")}</label>
                                <input type="text" className="form-control" name={field} value={formData[field]} onChange={handleChange} />
                                {errors[field] && <small className="text-danger">{errors[field]}</small>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="card p-4 mb-4">
                    <h4>Order Summary</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Shipping Charge</label>
                            <input type="number" className="form-control" name="shippingCharge" value={formData.shippingCharge} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Order Status</label>
                            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                                <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                    
                </div>

                {/* <button type="submit" className="btn btn-success">Submit Order</button> */}
                <button type="submit" className="btn btn-primary w-100">Submit Order</button><br></br>
            </form>
        </div>
    );
};

export default AddOrder;
