import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateOrder = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        orderDate: "",
        products: [],
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
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [orderData, setOrderData] = useState(null); // Store original order data

    // Fetch Users and Products for dropdown selections
    useEffect(() => {
        const fetchUserAndProductData = async () => {
            try {
                const [usersResponse, productsResponse] = await Promise.all([
                    axios.get("http://localhost:5000/api/user/view-user"),
                    axios.get("http://localhost:5000/api/product/view-product")
                ]);
                
                setUsers(usersResponse.data);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
                Swal.fire("Error", "Failed to load users or products data", "error");
            }
        };

        fetchUserAndProductData();
    }, []);

    // Fetch existing order data
    useEffect(() => {
        if (orderId) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/order/view-order/${orderId}`)
                .then(response => {
                    const order = response.data;
                    setOrderData(order); // Store original data
                    
                    // Format the date to YYYY-MM-DD for the date input
                    const formattedDate = order.orderDate ? 
                        new Date(order.orderDate).toISOString().slice(0, 10) : 
                        "";
                    
                    setFormData({
                        userId: order.userId || "",
                        orderDate: formattedDate,
                        products: order.products || [],
                        firstName: order.firstName || "",
                        lastName: order.lastName || "",
                        address: order.address || "",
                        city: order.city || "",
                        state: order.state || "",
                        pinCode: order.pinCode || "",
                        phone: order.phone || "",
                        shippingCharge: order.shippingCharge || "",
                        status: order.status || "Pending"
                    });
                    
                    console.log("Order data loaded:", order);
                })
                .catch(error => {
                    console.error("Error fetching order:", error);
                    Swal.fire("Error", "Failed to fetch order data", "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [orderId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors(prevErrors => {
                const newErrors = {...prevErrors};
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...formData.products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: value
        };
        
        setFormData(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
        
        // Clear error for this product field if it exists
        const errorKey = `products.${index}.${name}`;
        if (errors[errorKey]) {
            setErrors(prevErrors => {
                const newErrors = {...prevErrors};
                delete newErrors[errorKey];
                return newErrors;
            });
        }
    };

    const addProduct = () => {
        setFormData(prevState => ({
            ...prevState,
            products: [...prevState.products, { productId: "", quantity: 1 }]
        }));
    };

    const removeProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
        
        // Clean up any errors related to this product
        const newErrors = {...errors};
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`products.${index}`)) {
                delete newErrors[key];
            }
        });
        setErrors(newErrors);
    };

    const validateForm = () => {
        let newErrors = {};
        
        // Validate basic fields
        if (!formData.userId) newErrors.userId = "User is required";
        if (!formData.orderDate) newErrors.orderDate = "Order date is required";
        
        // Validate shipping details
        const requiredFields = ["firstName", "lastName", "address", "city", "state", "pinCode", "phone", "shippingCharge"];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                // Convert camelCase to Title Case with spaces
                const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                newErrors[field] = `${fieldName} is required`;
            }
        });
        
        // Validate phone number format
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be a 10-digit number";
        }
        
        // Validate products
        if (formData.products.length === 0) {
            newErrors.products = "At least one product is required";
        } else {
            formData.products.forEach((product, index) => {
                if (!product.productId) {
                    newErrors[`products.${index}.productId`] = "Product selection is required";
                }
                
                if (!product.quantity || product.quantity < 1) {
                    newErrors[`products.${index}.quantity`] = "Quantity must be at least 1";
                }
            });
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            Swal.fire("Validation Error", "Please fix the highlighted errors", "error");
            return;
        }
        
        setSubmitting(true);
        
        try {
            // Format any data if needed before submission
            const formattedData = {
                ...formData,
                // Any additional formatting can go here
            };
            
            await axios.put(`http://localhost:5000/api/order/update-order/${orderId}`, formattedData);
            
            Swal.fire({
                title: "Success!",
                text: "Order updated successfully",
                icon: "success",
                confirmButtonText: "Go to Orders List"
            }).then(() => {
                navigate("/admin/orders");
            });
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "Failed to update order: " + (error.response?.data?.message || error.message), "error");
        } finally {
            setSubmitting(false);
        }
    };

    // Find product name by ID for display purposes
    const getProductNameById = (productId) => {
        const product = products.find(p => p._id === productId);
        return product ? product.name : "Unknown Product";
    };

    // Find user name by ID for display purposes
    const getUserNameById = (userId) => {
        const user = users.find(u => u._id === userId);
        return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Update Order</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/orders">Orders</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Update Order</li>
                    </ol>
                </nav>
            </div>

            {loading ? (
                <div className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading order data...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Order Info */}
                    <div className="card p-4 mb-4">
                        <h4 className="card-title border-bottom pb-2">Order Information</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">User</label>
                                <select 
                                    className={`form-select ${errors.userId ? 'is-invalid' : ''}`} 
                                    name="userId" 
                                    value={formData.userId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        <option key={user._id} value={user._id}>
                                            {user.firstName} {user.lastName}
                                        </option>
                                    ))}
                                </select>
                                {errors.userId && (
                                    <div className="invalid-feedback">{errors.userId}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Order Date</label>
                                <input 
                                    type="date" 
                                    className={`form-control ${errors.orderDate ? 'is-invalid' : ''}`}
                                    name="orderDate" 
                                    value={formData.orderDate} 
                                    onChange={handleChange} 
                                />
                                {errors.orderDate && (
                                    <div className="invalid-feedback">{errors.orderDate}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="card p-4 mb-4">
                        <h4 className="card-title border-bottom pb-2">Products</h4>
                        {formData.products.length === 0 ? (
                            <div className="alert alert-warning">
                                No products added to this order yet.
                            </div>
                        ) : (
                            formData.products.map((product, index) => (
                                <div key={index} className="row mb-3 align-items-end border-bottom pb-3">
                                    <div className="col-md-5">
                                        <label className="form-label">Product</label>
                                        <select 
                                            className={`form-select ${errors[`products.${index}.productId`] ? 'is-invalid' : ''}`}
                                            name="productId" 
                                            value={product.productId || ""}
                                            onChange={(e) => handleProductChange(index, e)}
                                        >
                                            <option value="">Select Product</option>
                                            {products.map(prod => (
                                                <option key={prod._id} value={prod._id}>
                                                    {prod.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors[`products.${index}.productId`] && (
                                            <div className="invalid-feedback">{errors[`products.${index}.productId`]}</div>
                                        )}
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label">Quantity</label>
                                        <input 
                                            type="number" 
                                            className={`form-control ${errors[`products.${index}.quantity`] ? 'is-invalid' : ''}`}
                                            name="quantity" 
                                            min="1" 
                                            value={product.quantity || 1} 
                                            onChange={(e) => handleProductChange(index, e)} 
                                        />
                                        {errors[`products.${index}.quantity`] && (
                                            <div className="invalid-feedback">{errors[`products.${index}.quantity`]}</div>
                                        )}
                                    </div>
                                    <div className="col-md-2 d-flex">
                                        <button 
                                            type="button" 
                                            className="btn btn-danger w-100"
                                            onClick={() => removeProduct(index)}
                                        >
                                            <i className="fas fa-trash me-1"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={addProduct}
                        >
                            <i className="fas fa-plus me-1"></i> Add Product
                        </button>
                        {errors.products && (
                            <div className="text-danger mt-2">{errors.products}</div>
                        )}
                    </div>

                    {/* Shipping Details */}
                    <div className="card p-4 mb-4">
                        <h4 className="card-title border-bottom pb-2">Shipping Details</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                )}
                            </div>
                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                />
                                {errors.address && (
                                    <div className="invalid-feedback">{errors.address}</div>
                                )}
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">City</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                    name="city" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                />
                                {errors.city && (
                                    <div className="invalid-feedback">{errors.city}</div>
                                )}
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">State</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                    name="state" 
                                    value={formData.state} 
                                    onChange={handleChange} 
                                />
                                {errors.state && (
                                    <div className="invalid-feedback">{errors.state}</div>
                                )}
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">PIN Code</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`}
                                    name="pinCode" 
                                    value={formData.pinCode} 
                                    onChange={handleChange} 
                                />
                                {errors.pinCode && (
                                    <div className="invalid-feedback">{errors.pinCode}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Phone</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">{errors.phone}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="card p-4 mb-4">
                        <h4 className="card-title border-bottom pb-2">Order Summary</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Shipping Charge</label>
                                <input 
                                    type="number" 
                                    className={`form-control ${errors.shippingCharge ? 'is-invalid' : ''}`}
                                    name="shippingCharge" 
                                    value={formData.shippingCharge} 
                                    onChange={handleChange} 
                                />
                                {errors.shippingCharge && (
                                    <div className="invalid-feedback">{errors.shippingCharge}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Order Status</label>
                                <select 
                                    className="form-select" 
                                    name="status" 
                                    value={formData.status} 
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-3 mb-4">
                        <button 
                            type="button" 
                            className="btn btn-secondary flex-grow-1"
                            onClick={() => navigate("/admin/orders")}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary flex-grow-1" 
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Updating...
                                </>
                            ) : "Update Order"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateOrder;