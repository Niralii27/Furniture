import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import order1 from '../../images/cart1.png';

function OrderDetails() {
  return (
    <div className="container mt-4 mb-5">
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
            <h5 className="mb-2">Order# 7 <span className="badge bg-primary">Pending</span></h5>
            <p className="mb-0 text-muted">Order Date: 27-07-2025</p>
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
            <p><strong>Name:</strong> Nirali Akbari</p>
            <p><strong>Phone:</strong> +91 8849274162</p>
            <p><strong>Email:</strong> akbarinirali27@gmail.com</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="fw-bold">Shipping Address</h5>
            <p>Street: Backbone Park-9, 301, Shyam Apartment</p>
            <p>City: Rajkot</p>
            <p>State: Gujarat</p>
            <p>Pin code: 360001</p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="fw-bold">Billing Address</h5>
            <p>Street: Backbone Park-9, 301, Shyam Apartment</p>
            <p>City: Rajkot</p>
            <p>State: Gujarat</p>
            <p>Pin code: 360001</p>
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
                <tr>
                  <td>
                    <img
                      src={order1}
                      width="50"
                      className="me-2"
                      alt="Orange"
                    />
                    Chair round
                  </td>
                  <td>3</td>
                  <td>₹324.00</td>
                  <td>₹972.00</td>
                  
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Subtotal:</p>
            <p>₹324.00</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Delivery Charge:</p>
            <p>₹50.00</p>
          </div>
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">Total:</h5>
            <h5>₹374.00</h5>
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
