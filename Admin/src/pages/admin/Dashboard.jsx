import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 6000 },
  ];

  const recentOrders = [
    { id: 1, customer: "Alice", total: "$250", status: "Shipped" },
    { id: 2, customer: "Bob", total: "$150", status: "Pending" },
    { id: 3, customer: "Charlie", total: "$320", status: "Delivered" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2> Admin Dashboard</h2><br></br>

      {/* Overview Section */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ ...cardStyle, background: "#ffcc00", color: "#333" }}>
          <h3>Orders</h3>
          <p>1,245</p>
        </div>
        <div style={{ ...cardStyle, background: "#4caf50", color: "#fff" }}>
          <h3>Revenue</h3>
          <p>$12,540</p>
        </div>
        <div style={{ ...cardStyle, background: "#2196f3", color: "#fff" }}>
          <h3>Customers</h3>
          <p>894</p>
        </div>
        <div style={{ ...cardStyle, background: "#ff5722", color: "#fff" }}>
          <h3>Products</h3>
          <p>320</p>
        </div>
      </div>


    {/* Sales Chart */}
  <div style={{ background: "#f0f8ff", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
    <h3>Sales Overview</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={salesData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>


      {/* Recent Orders Table */}
      <div style={{ marginTop: "20px", background: "#f0f8ff ", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
        <h3>Recent Orders</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={tableHeader}>ID</th>
              <th style={tableHeader}>Customer</th>
              <th style={tableHeader}>Total</th>
              <th style={tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={tableCell}>{order.id}</td>
                <td style={tableCell}>{order.customer}</td>
                <td style={tableCell}>{order.total}</td>
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
