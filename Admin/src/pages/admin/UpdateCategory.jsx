import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const UpdateCategory = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("category_id");
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryId) {
            axios.get(`http://localhost:5000/api/Category/view-category/${categoryId}`)
                .then(res => {
                    setCategoryName(res.data.name);
                })
                .catch(err => {
                    console.error("Error fetching category:", err);
                    Swal.fire("Error", "Failed to fetch category data", "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            setError("Category name is required.");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            await axios.put(`http://localhost:5000/api/Category/update-category/${categoryId}`, {
                name: categoryName.trim()
            });

            Swal.fire("Updated!", "Category updated successfully", "success").then(() => {
                navigate("/admin/categories");
            });
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "Failed to update category", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="mt-4">Update Category</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item active">Update Category</li>
            </ol>

            {loading ? <p>Loading...</p> : (
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                                {error && <small className="text-danger">{error}</small>}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? "Updating..." : "Update Category"}
                            </button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin/categories")}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateCategory;
