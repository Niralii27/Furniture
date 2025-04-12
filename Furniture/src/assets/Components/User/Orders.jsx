import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { Link } from "react-router-dom"


function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; 
console.log("Fetching orders for userId:", userId);

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [userId]);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get("http://localhost:5000/api/Order/view-order");
  
      if (response.status === 200) {
        console.log("Orders fetched:", response.data); // Log the full order response
  
        // Convert userId to string before comparing
        const filteredOrders = response.data.filter((order) => {
          return order.userId && order.userId._id.toString() === userId.toString();
        });
  
        if (filteredOrders.length === 0) {
          console.log("No orders found for this userId.");
        } else {
          setOrders(filteredOrders);
        }
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setError("Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };
  


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5 pt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Account</li>
        </ol>
      </nav>

      <div className="row mt-4">
        {/* Left Sidebar */}
       <div className="col-md-3">
  <div className="card" style={{ border: "1px solid #d2b48c" }}>
    <div className="card-body">
      <div className="profile-menu">
        <Link
          to="/Account"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            display: "block",
            padding: "10px 0",
          }}
        >
          My Profile
        </Link>

        <Link
          to="/Orders"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            display: "block",
            padding: "10px 0",
          }}
        >
          My Orders
        </Link>
      </div>
    </div>
  </div>
</div>


        {/* Right Content */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">My Orders</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th style={{ padding: '15px 10px', fontWeight: '600' }}>Order ID</th>
                      <th style={{ padding: '15px 10px', fontWeight: '600' }}>Order Status</th>
                      <th style={{ padding: '15px 10px', fontWeight: '600' }}>Quantity</th>
                      <th style={{ padding: '15px 10px', fontWeight: '600' }}>Total Price</th>
                      <th style={{ padding: '15px 10px', fontWeight: '600' }}>View Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr key={index}>
                      <td className="pt-5">{order._id}</td>
                      <td className="pt-5">{order.status}</td>
                      <td className="pt-5">{order.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
                      <td className="pt-5">₹{order.total}</td>
                      <td>
                      <Link to={`/OrdersDetails/${order._id}`} style={{ textDecoration: "none" }}>
                        <button className="btn btn-custom mt-4">View Order</button>
                      </Link>                     
                      </td>
                    </tr>
                        ))
                             ) : (
                             <tr>
                             <td colSpan="5" className="text-center">No orders found.</td>
                            </tr>
                         )}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .profile-menu a {
          display: block;
          color: #8B4513;
          text-decoration: none;
          padding: 8px 0;
          font-weight: bold;
        }
        .profile-menu a.active {
          color: #8B4513;
          font-weight: bold;
        }
        .card {
          border: 1px solid #e0c3a1;
          border-radius: 10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .table th {
          background-color: #f8f9fa;
          color: #333;
        }
        .btn-custom {
          background-color: #D2B48C;
          border: 1px solid #e0c3a1;
          padding: 8px 16px;
          font-weight: 500;
          color: white;
        }
        .btn-custom:hover {
          background-color: #c2a178;
          border-color: #b08e63;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Orders;
