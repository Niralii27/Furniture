import React from "react";
import { Link } from "react-router-dom";

const orders = [
  {
    orderId: 1,
    customerName: "mr. Smith",
    orderDate: "2025-03-12",
    totalQuantity: 3,
    totalPrice: 1500.5,
    orderStatus: "Pending",
  },
  {
    orderId: 2,
    customerName: "mrs. Bhayani",
    orderDate: "2025-03-11",
    totalQuantity: 2,
    totalPrice: 900.0,
    orderStatus: "Shipped",
  },
];

const OrderTable = () => {
  return (
    <div className="card-body">
      <div className="table-responsive">
      <table className="table border text-nowrap">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  <Link to={`/admin/user-profile`}>{order.customerName}</Link>
                </td>
                <td>{order.orderDate}</td>
                <td>{order.totalQuantity}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>
              <div className="d-flex flex-nowrap gap-2">
                <Link to={`/admin/view-order`} className="text-info">
                  <i className="fas fa-eye"></i>
                </Link>

                <Link to={`/admin/update-order`} className="text-primary">
                  <i className="fas fa-edit"></i>
                </Link>

                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(order.orderId)}
                >
                  <i className="fas fa-trash-alt"></i>
                </span>
              </div>
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" disabled>Previous</button></li>
                        <li className="page-item active"><button className="page-link" disabled>1</button></li>
                        <li className="page-item"><button className="page-link" disabled>2</button></li>
                        <li className="page-item"><button className="page-link" disabled>3</button></li>
                        <li className="page-item"><button className="page-link" disabled>Next</button></li>
                    </ul>
                </nav>
            </div>
    </div>
    
  );
};

const handleDelete = (orderId) => {
  alert(`Delete order with ID: ${orderId}`);
};

export default OrderTable;
