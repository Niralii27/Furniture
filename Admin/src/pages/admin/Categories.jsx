import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Pagination, Box } from "@mui/material";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get("http://localhost:5000/api/category/view-category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch categories."
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (categoryId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This category will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/category/delete-category/${categoryId}`)
                    .then(() => {
                        Swal.fire("Deleted!", "The category has been deleted.", "success");
                        fetchCategories(); // Refresh list
                    })
                    .catch((error) => {
                        console.error("Error deleting category:", error);
                        Swal.fire("Error!", "Failed to delete the category.", "error");
                    });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4 flex-wrap">
                <div>
                    <h2>Category List</h2>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Categories</li>
                    </ol>
                </div>

                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        placeholder="Search category..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // reset to page 1 when searching
                        }}
                    />
                    <Link className="btn btn-outline-secondary" to="/admin">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <Link className="btn btn-primary" to="/admin/add-category">
                        <i className="fas fa-plus-circle"></i>
                    </Link>
                </div>
            </div>

            <div className="card-body">
                {loading ? (
                    <p>Loading categories...</p>
                ) : (
                    <>
                        <table className="table table-bordered text-nowrap">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.length > 0 ? (
                                    currentCategories.map((category, index) => (
                                        <tr key={category._id}>
                                            <td>{indexOfFirst + index + 1}</td>
                                            <td>{category.name}</td>
                                            <td>
                                                <div className="d-flex flex-nowrap">
                                                    <Link className="text-primary me-2" to={`/admin/update-category?category_id=${category._id}`}>
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="text-danger"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(category._id)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {filteredCategories.length > rowsPerPage && (
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

export default CategoryList;
