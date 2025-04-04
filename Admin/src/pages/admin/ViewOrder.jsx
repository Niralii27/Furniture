import React from "react";
import { Link } from "react-router-dom";

const ViewOrder = () => {
    const orderData = {
        orderId: "12345",
        orderDate: "2025-03-13",
        orderStatus: "Shipped",
        paymentMode: "Credit Card",
        shippingCharge: 50,
        total: 1050,
        user: {
            firstName: "Mrs. Dipti",
            lastName: "Sureja",
            email: "diptisureja@gmail.com",
            mobileNo: "9876543210",
        },
        address: {
            fullName: "Ms. Bhayani",
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            pincode: "10001",
            phone: "9876543210",
        },
        items: [
            {
                productId: "P001",
                productName: "Aether Comfort Leather Bed",
                price: 200,
                quantity: 2,
                image: "https://sunnymate.co/wp-content/uploads/2024/12/01-600x600.jpg",
            },
            {
                productId: "P002",
                productName: "Apex Comfort Chair",
                price: 150,
                quantity: 3,
                image: "https://sunnymate.co/wp-content/uploads/2024/12/%E6%B8%B8%E7%8C%8E%E6%A4%85E906E827%E8%BE%B9%E5%87%A0-600x450.webp",
            },
        ],
    };

    return (
        <div className="container-fluid px-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h1>View Order</h1>
                <nav>
                    <Link to="/admin">Dashboard</Link> / 
                    <Link to="/admin/orders">Orders</Link> / 
                    <span>View Order</span>
                </nav>
            </div>

            {/* Order Details */}
            <div className="card mb-4">
                <div className="card-header"><h5>Order Details</h5></div>
                <div className="card-body">
                    <p><strong>Order ID:</strong> {orderData.orderId}</p>
                    <p><strong>Status:</strong> {orderData.orderStatus}</p>
                    <p><strong>Order Date:</strong> {orderData.orderDate}</p>
                    <p><strong>Payment Mode:</strong> {orderData.paymentMode}</p>
                </div>
            </div>

            <div className="row">
                {/* Shipping Address */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header"><h5>Shipping Address</h5></div>
                        <div className="card-body">
                            {Object.entries(orderData.address).map(([key, value]) => (
                                <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value}</p>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* User Information */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header"><h5>User Information</h5></div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {orderData.user.firstName} {orderData.user.lastName}</p>
                            <p><strong>Email:</strong> {orderData.user.email}</p>
                            <p><strong>Phone:</strong> {orderData.user.mobileNo}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ordered Items */}
            <div className="card mb-4">
                <div className="card-header"><h5>Ordered Items</h5></div>
                <div className="card-body">
                    <table className="table border">
                        <thead className="table-light">
                            <tr>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.items.map((item) => (
                                <tr key={item.productId}>
                                    <td><img src={item.image} alt={item.productName} width="50" /></td>
                                    <td>{item.productName}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4" className="text-end">Subtotal:</th>
                                <td>₹{orderData.total - orderData.shippingCharge}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className="text-end">Shipping Charge:</th>
                                <td>₹{orderData.shippingCharge}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className="text-end">Total:</th>
                                <td>₹{orderData.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
