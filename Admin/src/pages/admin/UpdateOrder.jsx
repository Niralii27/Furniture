import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateOrder = () => {
    const [formData, setFormData] = useState({
        userId: "12345",
        orderDate: "2025-03-15",
        products: [
            { productId: "1", quantity: 2 },
            { productId: "2", quantity: 1 }
        ],
        firstName: "Mrs",
        lastName: "Bhayani",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        pinCode: "10001",
        phone: "9876543210",
        shippingCharge: "50",
        status: "Pending"
    });
    
    const [errors, setErrors] = useState({});
    const users = [ { id: "1", name: "User 1" }, { id: "2", name: "User 2" } ];
    const products = [ { id: "101", name: "Morden Bed" }, { id: "102", name: "Coffy Table" },{ id: "103", name: "Dinning Table" } ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const newProducts = [...formData.products];
        newProducts[index][name] = value;
        setFormData({ ...formData, products: newProducts });
    };

    const addProduct = () => {
        setFormData({ ...formData, products: [...formData.products, { productId: "", quantity: 1 }] });
    };

    const removeProduct = (index) => {
        setFormData({ ...formData, products: formData.products.filter((_, i) => i !== index) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Order updated successfully");
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
                      <button type="submit" className="btn btn-primary w-100">Update Order</button><br></br>
                  </form>
              </div>
    );
};

export default UpdateOrder;