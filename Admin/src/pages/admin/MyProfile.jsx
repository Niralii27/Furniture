import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

const MyProfile = () => {
    const [emailForm, setEmailForm] = useState({
        fullname: "",
        lastName: "",
        email: "",
        phone: "",
        userImage: null,
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "user.password",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    // Set user from URL or localStorage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userData = urlParams.get('userData');

        if (userData) {
            const parsedUser = JSON.parse(decodeURIComponent(userData));
            console.log("Decoded user from URL:", parsedUser);
            setUser(parsedUser);
            localStorage.setItem("admin", JSON.stringify(parsedUser));
        } else {
            const stored = localStorage.getItem("admin");
            if (stored) {
                const parsedStored = JSON.parse(stored);
                console.log("User from localStorage:", parsedStored);
                setUser(parsedStored);
            }
        }
    }, []);

    // Fetch user data when user is available
    useEffect(() => {
        if (user && user.id) {
            console.log("Calling fetchUserData with ID:", user.id);
            setUserId(user.id);
            fetchUserData(user.id);
        }
    }, [user]);

    const fetchUserData = async (id) => {
        if (!id) return;

        try {
            console.log("Fetching user data for ID:", id);
            const res = await axios.get(`http://localhost:5000/api/Login/view-user/${id}`);
            console.log("User fetched:", res.data);

            const { fullname, lastName, email, phone, userImage } = res.data;

            // Generate image URL if userImage exists
            const imageUrl = userImage
                ? `http://127.0.0.1:5000/public/uploads/${userImage}`
                : null;

            setEmailForm((prev) => ({
                ...prev,
                fullname,
                lastName,
                email,
                phone,
                userImage: imageUrl, // Set the image URL here
            }));
        } catch (err) {
            console.error("Fetch error:", err.response?.data || err.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load user profile.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleEmailChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === "file" ? files[0] : value;
        setEmailForm((prev) => ({ ...prev, [name]: newValue }));

        const error = validateField(name, newValue);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;

        if (["fullname", "lastName", "email", "phone"].includes(name) && !value) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        }

        if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Invalid email format";
        }

        if (name === "newPassword" && value.length < 8) {
            error = "New password must be at least 8 characters.";
        }

        if (name === "confirmPassword" && value !== passwordForm.newPassword) {
            error = "Passwords do not match.";
        }

        return error;
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
    
        const formErrors = {};
        Object.keys(emailForm).forEach((field) => {
            // Skip validation for userImage if it's not a File instance or null
            if (field === "userImage" && !(emailForm[field] instanceof File)) return;
            
            const error = validateField(field, emailForm[field]);
            if (error) formErrors[field] = error;
        });
    
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append("fullname", emailForm.fullname);
        formDataToSend.append("lastName", emailForm.lastName);
        formDataToSend.append("email", emailForm.email);
        formDataToSend.append("phone", emailForm.phone);
    
        let isImageUpdated = false;
        if (emailForm.userImage instanceof File) {
            formDataToSend.append("userImage", emailForm.userImage);
            isImageUpdated = true;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/Login/update-user/${userId}`, {
                method: "PUT",
                body: formDataToSend,
            });
    
            const result = await response.json();
            console.log("Response from backend:", result);
    
            if (response.ok) {
                // Show success message using SweetAlert
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
    
                // Update form state with returned values
                const updatedUser = result.user || {};
                
                // Update local storage with new user data
                if (localStorage.getItem("admin")) {
                    const currentUserData = JSON.parse(localStorage.getItem("admin"));
                    const updatedUserData = {
                        ...currentUserData,
                        fullname: updatedUser.fullname || emailForm.fullname,
                        lastName: updatedUser.lastName || emailForm.lastName,
                        email: updatedUser.email || emailForm.email,
                        phone: updatedUser.phone || emailForm.phone,
                        userImage: updatedUser.userImage || (
                            typeof emailForm.userImage === 'string' 
                                ? emailForm.userImage.split('/').pop() 
                                : null
                        )
                    };
                    localStorage.setItem("admin", JSON.stringify(updatedUserData));
                }
                
                // Refresh user data
                if (userId) {
                    fetchUserData(userId);
                }
                
                // If image was updated, show additional message
                if (isImageUpdated && updatedUser.userImage) {
                    setTimeout(() => {
                        Swal.fire({
                            title: 'Info',
                            text: 'Profile picture updated.',
                            icon: 'info',
                            confirmButtonText: 'OK'
                        });
                    }, 1000);
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Update failed: ' + result.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(passwordForm).forEach((field) => {
            const error = validateField(field, passwordForm[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            // Use the format expected by your backend API
            const formData = {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            };

            const response = await fetch(`http://localhost:5000/api/Login/change-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
                // Clear form fields
                setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            } else {
                // If server returns an error
                Swal.fire({
                    title: 'Error!',
                    text: result.message || 'Failed to update password',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                
                // If the error is about incorrect password
                if (result.message && result.message.toLowerCase().includes('incorrect')) {
                    setErrors(prev => ({
                        ...prev,
                        currentPassword: "Current password is incorrect"
                    }));
                }
            }
        } catch (error) {
            console.error("Password update error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to connect to the server. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">User Settings</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Profile</li>
            </ol>

            <div className="card mb-4">
                <div className="card-header"><h4>Update Profile</h4></div>
                <div className="card-body">
                    <form onSubmit={handleEmailSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="fullname" value={emailForm.fullname} onChange={handleEmailChange} />
                            {errors.fullname && <p className="text-danger">{errors.fullname}</p>}
                        </div>
                        <div className="mb-3">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={emailForm.lastName} onChange={handleEmailChange} />
                            {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={emailForm.email} onChange={handleEmailChange} />
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>
                        <div className="mb-3">
                            <label>Phone</label>
                            <input type="text" className="form-control" name="phone" value={emailForm.phone} onChange={handleEmailChange} />
                            {errors.phone && <p className="text-danger">{errors.phone}</p>}
                        </div>
                        <div className="mb-3">
                            <label>Profile Picture</label>
                            {emailForm.userImage && (
                                <div>
                                    <img
                                        src={typeof emailForm.userImage === 'string' ? emailForm.userImage : URL.createObjectURL(emailForm.userImage)}
                                        alt="Profile"
                                        className="img-fluid mb-3"
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                            <input type="file" className="form-control" name="userImage" onChange={handleEmailChange} accept="image/*" />
                            {errors.userImage && <p className="text-danger">{errors.userImage}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header"><h4>Change Password</h4></div>
                <div className="card-body">
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label>Current Password</label>
                            <input type="password" className="form-control" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} />
                            {errors.currentPassword && <p className="text-danger">{errors.currentPassword}</p>}
                        </div>
                        <div className="mb-3">
                            <label>New Password</label>
                            <input type="password" className="form-control" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} />
                            {errors.newPassword && <p className="text-danger">{errors.newPassword}</p>}
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
                            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;