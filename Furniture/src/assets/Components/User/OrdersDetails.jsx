import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import order1 from '../../images/cart1.png';

function OrderDetails() {
  const { id } = useParams(); // orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Order/view-order/${id}`);
        console.log(response.data); // Check the response in the console
        if (response.status === 200) {
          setOrder(response.data);
        }
      } catch (err) {
        setError("Failed to fetch order details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  // Loading and error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="container mt-5 pt-4 mb-5">
      {/* Breadcrumb */}
      <nav className="d-flex justify-content-between">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Orders</li>
          <li className="breadcrumb-item active" aria-current="page">Order# 7</li>
        </ol>
        <span className="text-success">Welcome! Nirali</span>
      </nav>

      {/* Order Summary */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-2">Order# {order?._id} <span className="badge bg-primary">{order?.status}</span></h5>
            <p className="mb-0 text-muted">Order Date: {new Date(order?.orderDate).toLocaleDateString()}</p>
          </div>
          <button className="btn text-white" style={{ backgroundColor: '#D2B48C' }}>Re-order</button>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="row mb-4">
        {/* Customer & Order */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="fw-bold">Customer & Order</h5>
            <p><strong>Name:</strong> {order?.firstName} {order?.lastName}</p>
            <p><strong>Phone:</strong> {order?.phone}</p>
            <p><strong>Email:</strong> {order?.userId?.email}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="fw-bold">Shipping Address</h5>
            <p>Street:  {order?.address}</p>
            <p>City: {order?.city}</p>
            <p>State: {order?.state}</p>
            <p>Pin code: {order?.pinCode}</p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="fw-bold">Billing Address</h5>
            <p>Street: {order?.address}</p>
            <p>City: {order?.city}</p>
            <p>State: {order?.state}</p>
            <p>Pin code: {order?.pinCode}</p>
          </div>
        </div>
      </div>

      {/* Items Ordered */}
      <div className="card">
        <div className="card-body">
          <h5 className="fw-bold">Items ordered</h5>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th>ITEM NAME</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th >TOTAL</th>
                </tr>
              </thead>
              <tbody>
              {order?.products?.map((item, index) => (

              <tr key={index}>
                  <td>
                    <img
                       src={item?.productId?.productImage ? `http://127.0.0.1:5000/public/uploads/${item.productId.productImage}` : order1}
                       width="50"
                      className="me-2"
                      alt="Orange"
                    />

                  </td>
                  <td>{item?.quantity}</td>
                  <td>₹{item?.productId?.costPrice}</td>
                  <td>₹{item?.quantity * item?.productId?.costPrice}</td>
                  
                </tr>
                 ))}

              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Subtotal:</p>
            <p>₹{order?.total - order?.shippingCharge}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Delivery Charge:</p>
            <p>₹{order?.shippingCharge}</p>
          </div>
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">Total:</h5>
            <h5>₹{order?.total}</h5>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .order-btn {
            background-color: #D2B48C !important;
            border-color: #D2B48C;
            color: white !important;
            transition: 0.3s;
          }
          .order-btn:hover {
            background-color: #c2a176 !important;
            border-color: #c2a176;
          }
          .breadcrumb-item a {
            color: #8B4513;
            text-decoration: none;
          }
          .table th {
            background-color: #f8f9fa;
          }
          .card {
            border-color: #D2B48C;
          }
          .profile-avatar {
            width: 150px;
            height: 150px;
          }
        `}
      </style>
    </div>
  );
}

export default OrderDetails;
