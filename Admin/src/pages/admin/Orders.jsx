import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Pagination, Box } from "@mui/material";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get("http://localhost:5000/api/Order/view-orders")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                Swal.fire("Error", "Failed to fetch orders", "error");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This order will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/Order/delete-order/${orderId}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Order has been deleted.", "success");
                        fetchOrders();
                    })
                    .catch((error) => {
                        console.error("Error deleting order:", error);
                        Swal.fire("Error!", "Failed to delete order.", "error");
                    });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredOrders = orders.filter((order) =>
        order.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-5">
                <div>
                    <h1>Orders</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Orders</li>
                    </ol>
                </div>
                  {/* for search */}
                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        placeholder="Search by name, email or phone..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // reset to first page on new search
                        }}
                    />


                    <Link className="btn btn-outline-secondary" to="/admin">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <Link className="btn btn-primary text-nowrap" to="/admin/add-order">
                        <i className="fas fa-user-plus fa-lg"></i>
                    </Link>
                </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: "300px" }}
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // reset to page 1 when searching
                    }}
                />
            </div>

            <div className="card-body">
                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <>
                        <table className="table border text-nowrap">
                            <thead className="table-light">
                                <tr>
                                    <th>User</th>
                                    <th>Order Date</th>
                                    <th>Products</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Shipping</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.length > 0 ? (
                                    currentOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order.firstName} {order.lastName}</td>
                                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td>
                                                <ul className="list-unstyled mb-0">
                                                    {order.products.map((item, idx) => (
                                                        <li key={idx}>
                                                            {item.productId?.name || "Product"} x {item.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                {order.address}, {order.city}, {order.state}, {order.pinCode}
                                            </td>
                                            <td>{order.phone}</td>
                                            <td>₹{order.shippingCharge}</td>
                                            <td>
                                                <span className={`badge bg-${order.status === "Delivered" ? "success" : order.status === "Pending" ? "warning" : "secondary"}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-nowrap">
                                                    <Link className="text-primary me-2" to={`/admin/update-order?order_id=${order._id}`}>
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="text-danger"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(order._id)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {filteredOrders.length > rowsPerPage && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Orders;
