import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
    const [products] = useState([
        {
            id: 1,
            name: "Matrix Prime Sofa",
            image: "https://sunnymate.co/wp-content/uploads/2024/12/1002-%E8%83%8C%E9%9D%A2%E5%9B%BE-600x600.jpg",
            salePrice: 150,
            discount: 5,
            soldQuantity: 500,
            stock: 100,
            category: "Sofa"
        },
        {
            id: 2,
            name: "Apex Comfort Chair",
            image: "https://sunnymate.co/wp-content/uploads/2024/12/%E6%B8%B8%E7%8C%8E%E6%A4%85E906E827%E8%BE%B9%E5%87%A0-600x450.webp",
            salePrice: 80,
            discount: 10,
            soldQuantity: 300,
            stock: 50,
            category: "Chair"
        },

        {
            id: 2,
            name: "Aether Comfort Leather Bed",
            image: "https://sunnymate.co/wp-content/uploads/2024/12/01-600x600.jpg",
            salePrice: 80000,
            discount: 10,
            soldQuantity: 35,
            stock: 50,
            category: "Bed"
        }

    ]);

    const handleDelete = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Deleted!",
                    "The product has been deleted.",
                    "success"
                );
                // Add deletion logic here
            }
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-5">
                <div>
                    <br></br>
                    <h1>Products</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Products</li>
                    </ol>
                </div>
                <div className="d-flex gap-2">
                <Link className="btn btn-outline-secondary" to="/admin">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <Link className="btn btn-primary text-nowrap" to="/admin/add-product">
                    <i className="fas fa-plus-circle fa-lg"></i>
                </Link>
                </div>
            </div>
            
            <div className="card-body">
                <table className="table border text-nowrap">
                    <thead className="table-light">
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Sold Quantity</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.name} style={{ width: 50, height: 50, objectFit: "cover" }} />
                                        <span className="ms-2">{product.name}</span>
                                    </td>
                                    <td>₹{product.salePrice}</td>
                                    <td>{product.discount}%</td>
                                    <td>{product.soldQuantity}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category}</td>
                                   

                                    <td>
                                        <div className="d-flex flex-nowrap">
                                            {/* <Link className="text-info me-2" to={`/admin/view-product`}>
                                                <i className="fas fa-eye"></i>
                                            </Link> */}
                                            <Link className="text-primary me-2" to={`/admin/update-product`}>
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <span className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(product.id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                        </div>
                                    </td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">There are no products to display!</td>
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

export default ProductList;