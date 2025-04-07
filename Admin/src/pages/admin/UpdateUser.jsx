import { useSearchParams, useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const UpdateUser = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("user_id");
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        userImage: "",
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/User/view-user/${userId}`);
                const user = response.data;
                
                setFormData({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    password: "", // Don't pre-fill password for security
                    userImage: null,
                });
                
                if (user.userImage) {
                    setPreview(`http://localhost:5000/public/uploads/${user.userImage}`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                Swal.fire("Error", "Failed to load user data", "error");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value

         }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith("image/")) {
                setErrors(prev => ({ ...prev, userImage: "Please select an image file" }));
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setErrors(prev => ({ ...prev, userImage: "Image size should be less than 2MB" }));
                return;
            }
            
            setFormData(prev => ({ ...prev, userImage: file }));
            setPreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, userImage: "" }));
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number (10-15 digits)";
        }
        
        // if (formData.password && formData.password.length < 6) {
        //     newErrors.password = "Password must be at least 6 characters";
        // }
        //  else if (formData.password.length < 6) {
        //     newErrors.password = "Password must be at least 6 characters";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) return;

        // Prepare FormData for submission (including file upload)
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        // formDataToSend.append("password", formData.password);
        
        // Only append image if it's a new file
        if (formData.userImage instanceof File) {
            formDataToSend.append("userImage", formData.userImage);
        }

        try {
            setSubmitting(true);
            
            // Send PUT request to update user
            const response = await axios.put(
                `http://localhost:5000/api/User/update-user/${userId}`,
                formDataToSend,
                {
                    headers: { 
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Show success message
            await Swal.fire({
                title: "Success!",
                text: "User updated successfully",
                icon: "success",
                confirmButtonText: "OK",
            });
            
            // Redirect to users list after successful update
            navigate("/admin/users");
            
        } catch (error) {
            console.error("Update failed:", error);
            
            let errorMessage = "Failed to update user";
            if (error.response) {
                // Handle specific error responses from backend
                if (error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
            }
            
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Update User</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/admin/users">Users</Link>
                </li>
                <li className="breadcrumb-item active">Update User</li>
            </ol>

            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-user-edit me-1"></i>
                    User Details
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">
                                    First Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">
                                    Last Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                )}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">
                                    Phone <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">{errors.phone}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Password <span className="text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled
                                placeholder="User password can't be changed"
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>


                        <div className="mb-4">
                            <label className="form-label">Profile Image</label>
                            <input
                                type="file"
                                className={`form-control ${errors.userImage ? "is-invalid" : ""}`}
                                name="userImage"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {errors.userImage && (
                                <div className="invalid-feedback">{errors.userImage}</div>
                            )}
                            {preview && (
                                <div className="mt-2">
                                    <img
                                        src={preview}
                                        alt="Profile Preview"
                                        className="img-thumbnail"
                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/admin/users")}
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : (
                                    "Update User"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;