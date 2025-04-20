import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
    console.log("Admin data stored in localStorage:", JSON.parse(localStorage.getItem("admin")));

    const [emailForm, setEmailForm] = useState({
        fullname: "",
        lastName: "",
        email: "",
        phone: "",
        userImage: null,
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState(null);

  // UseEffect with a slight delay or retry mechanism
useEffect(() => {
    const timer = setTimeout(() => {
        const user = JSON.parse(localStorage.getItem("admin"));
        console.log("admin:", user);

        if (user && user.id) {
            setUserId(user.id);
            fetchUserData(user.id);
        } else {
            console.log("No admin data in localStorage");
        }
    }, 100); // Wait for 100ms before trying to get localStorage

    return () => clearTimeout(timer);
}, []);

    const fetchUserData = async (id) => {
        if (!id) return; // Prevent API call if no user ID is set
    
        try {
            console.log("Fetching user data for ID:", id);
    
            const res = await axios.get(`/api/view-user/${id}`);
            console.log("User fetched:", res.data);
    
            const { fullname, lastName, email, phone } = res.data;
    
            setEmailForm((prev) => ({
                ...prev,
                fullname,
                lastName,
                email,
                phone,
            }));
        } catch (err) {
            console.error("Fetch error:", err.response?.data || err.message);
            toast.error("Failed to load user profile.");
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

        if (name === "userImage" && value && !["image/jpeg", "image/png", "image/jpg"].includes(value?.type)) {
            error = "Only JPG, JPEG, and PNG images are allowed.";
        }

        if (name === "currentPassword" && value.length < 8) {
            error = "Current password must be at least 8 characters.";
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
            const error = validateField(field, emailForm[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append("fullname", emailForm.fullname);
        formData.append("lastName", emailForm.lastName);
        formData.append("email", emailForm.email);
        formData.append("phone", emailForm.phone);
        if (emailForm.userImage) {
            formData.append("userImage", emailForm.userImage);
        }

        try {
            await axios.put(`/api/update-user/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Failed to update profile.");
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
            await axios.put(`/api/change-password/${userId}`, {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            toast.success("Password updated successfully!");
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            console.error("Password update error:", err);
            toast.error(err.response?.data?.message || "Failed to update password.");
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
                            <label>Confirm New Password</label>
                            <input type="password" className="form-control" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
                            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
