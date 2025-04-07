import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";


const AddCategory = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const validateCategory = (value) => {
        if (!value.trim()) {
            return "Category name is required.";
        }
        if (value.length < 3) {
            return "Category name must be at least 3 characters.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateCategory(name);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/Category/add-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: data.message || "Category added successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/admin/categories");
                });

                setName("");
                setError("");
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.error || "Something went wrong.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div>
            <br />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Add New Category</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link> / <Link to="/admin/categories">Categories</Link> / Add Category
                </nav>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter category name"
                            />
                            {error && <p className="text-danger">{error}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
