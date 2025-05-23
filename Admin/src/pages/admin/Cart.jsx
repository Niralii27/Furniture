import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
    const userId = 101;
    const user = { firstName: "  xyz ", lastName: "User" };

    const [cart, setCart] = useState([
        { id: 1, name: "Matrix Prime Sofa", quantity: 2, price: 50, image: "https://sunnymate.co/wp-content/uploads/2024/12/1002-%E8%83%8C%E9%9D%A2%E5%9B%BE-600x600.jpg" },
        { id: 2, name: "Apex Comfort Chair", quantity: 1, price: 40, image: "https://sunnymate.co/wp-content/uploads/2024/12/%E6%B8%B8%E7%8C%8E%E6%A4%85E906E827%E8%BE%B9%E5%87%A0-600x450.webp" },
        { id: 3, name: "Aether Comfort Leather Bed", quantity: 3, price: 20, image: "https://sunnymate.co/wp-content/uploads/2024/12/01-600x600.jpg" }
    ]);

    const handleRemove = (productId, productName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to remove ${productName} from the cart?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Removed!", `${productName} has been removed.`, "success");
            }
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <div>
                    <h1>Cart of {user.firstName} {user.lastName}</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/users">Users</Link></li>
                        <li className="breadcrumb-item active">Cart</li>
                    </ol>
                </div>
                <Link className="btn btn-primary text-nowrap" to="#">
                <i className="fas fa-plus-circle fa-lg"></i>
                </Link>
            </div>

            <div className="card-body">
                <table className="table border text-nowrap align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Product Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={`/img/items/products/${item.image}`} alt={item.name} style={{ width: 50, height: 50, objectFit: "cover" }} className="me-2" />
                                            {/* <Link to="/admin/product">{item.name}</Link> */}
                                        </div>
                                  
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price}</td>
                                    <td>₹{item.quantity * item.price}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleRemove(item.id, item.name)}>
                                            <i className="fas fa-times"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No items in the cart.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <Link className="page-link" to="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                            <Link className="page-link" to="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Cart;
