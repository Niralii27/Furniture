import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 6000 },
  ];

  useEffect(() => {
    // Fetch recent orders
    axios
      .get("http://localhost:5000/api/Order/recent-orders")
      .then((res) => setRecentOrders(res.data))
      .catch((err) => console.error("Failed to fetch recent orders:", err));

    // Fetch total orders count
    axios
      .get("http://localhost:5000/api/Order/total-orders-count")
      .then((res) => setTotalOrders(res.data.totalOrders))
      .catch((err) => console.error("Failed to fetch total orders:", err));

    // Fetch total users count
    axios
      .get("http://localhost:5000/api/Login/total-users-count")
      .then((res) => setTotalUsers(res.data.totalUsers))
      .catch((err) => console.error("Failed to fetch total users:", err));

    // Fetch total products count
    axios
      .get("http://localhost:5000/api/Product/total-products-count")
      .then((res) => setTotalProducts(res.data.totalProducts))
      .catch((err) => console.error("Failed to fetch total products:", err));

    // Fetch total contacts count
    axios
      .get("http://localhost:5000/api/Contact/total-contacts-count")
      .then((res) => setTotalContacts(res.data.totalContacts))
      .catch((err) => console.error("Failed to fetch total contacts:", err));

    // Fetch monthly orders data
    axios
      .get("http://localhost:5000/api/Order/monthly-orders")
      .then((res) => setMonthlyOrders(res.data))
      .catch((err) => console.error("Failed to fetch monthly orders:", err));
      
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Admin Dashboard</h2>
      <br />

      {/* Overview Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ ...cardStyle, background: "#ffcc00", color: "#333" }}>
          <h3>Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div style={{ ...cardStyle, background: "#9c27b0", color: "#fff" }}>
          <h3>Contacts</h3>
          <p>{totalContacts}</p>
        </div>

        <div style={{ ...cardStyle, background: "#2196f3", color: "#fff" }}>
          <h3>Customers</h3>
          <p>{totalUsers}</p>
        </div>

        <div style={{ ...cardStyle, background: "#4caf50", color: "#fff" }}>
          <h3>Products</h3>
          <p>{totalProducts}</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div
        style={{
          background: "#f0f8ff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
       <ResponsiveContainer width="100%" height={250}>
  <LineChart data={monthlyOrders}>
    <XAxis dataKey="month" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="orders"
      stroke="#007bff"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>

      </div>

      {/* Recent Orders */}
      <div
        style={{
          marginTop: "20px",
          background: "#f0f8ff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Recent Orders</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={tableHeader}>ID</th>
              <th style={tableHeader}>User</th>
              <th style={tableHeader}>Products</th>
              <th style={tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={order._id}>
                <td style={tableCell}>{index + 1}</td>
                <td style={tableCell}>
                  {order.firstName} {order.lastName}
                </td>
                <td style={tableCell}>{order.products?.length}</td>
                <td style={tableCell}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",
  flex: "1",
};

const tableHeader = {
  padding: "10px",
  textAlign: "left",
};

const tableCell = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default Dashboard;

