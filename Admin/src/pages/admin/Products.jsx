import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Pagination, Box } from "@mui/material";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://localhost:5000/api/Product/view-product")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch products."
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

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
                axios.delete(`http://localhost:5000/api/Product/delete-product/${productId}`)
                    .then(() => {
                        Swal.fire("Deleted!", "The product has been deleted.", "success");
                        fetchProducts();
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        Swal.fire("Error!", "Failed to delete the product.", "error");
                    });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const indexOfLastProduct = currentPage * rowsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-5 flex-wrap">
                <div>
                    <h1>Products</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Products</li>
                    </ol>
                </div>

                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        placeholder="Search by name or category..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <Link className="btn btn-outline-secondary" to="/admin">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <Link className="btn btn-primary text-nowrap" to="/admin/add-product">
                        <i className="fas fa-plus-circle fa-lg"></i>
                    </Link>
                </div>
            </div>

            <div className="card-body">
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <>
                        <table className="table border text-nowrap">
                            <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Cost Price</th>
                                    <th>Sale Price</th>
                                    <th>Discount</th>
                                    <th>Stock Quantity</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>₹{product.costPrice}</td>
                                            <td>₹{product.salePrice}</td>
                                            <td>{product.discount || 0}%</td>
                                            <td>{product.stockQuantity}</td>
                                            <td style={{ maxWidth: '200px' }}>{product.description}</td>
                                            <td>
                                                <img
                                                    src={product.productImage ? `http://127.0.0.1:5000/public/uploads/${product.productImage}` : "https://via.placeholder.com/50"}
                                                    alt={product.name}
                                                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "50%" }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-nowrap">
                                                    <Link className="text-primary me-2" to={`/admin/update-product?product_id=${product._id}`}>
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(product._id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No products found!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {filteredProducts.length > rowsPerPage && (
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

export default ProductList;
