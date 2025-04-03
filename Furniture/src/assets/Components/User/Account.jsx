import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Account() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "Nirali",
    lastName: "Akbari",
    email: "akbarinirali27@gmail.com",
    phone: "8849274162",
    userImage: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png");

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        userImage: file
      });
      
      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate profile form
  const validateProfileForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (/\d/.test(formData.firstName)) {
      newErrors.firstName = "First name cannot contain numbers";
    }
   
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (/\d/.test(formData.lastName)) {
      newErrors.lastName = "Last name cannot contain numbers";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // File validation
    if (formData.userImage) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(formData.userImage.type)) {
        newErrors.userImage = "Please select a valid image file (JPEG, PNG, or GIF)";
      } else if (formData.userImage.size > 5 * 1024 * 1024) { // 5MB limit
        newErrors.userImage = "Image size should be less than 5MB";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password form
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      // Submit form data
      console.log("Profile updated:", formData);
      alert("Profile updated successfully!");
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      // Submit password change
      console.log("Password changed");
      alert("Password changed successfully!");
      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setPasswordErrors({});
    }
  };
      
  return (
    <div className="container mt-4 pt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item active" aria-current="page">Account</li>
        </ol>
      </nav>

      <div className="row mt-4">
        {/* Left Sidebar */}
        <div className="col-md-3">
          <div className="card" style={{border: '1px solid #d2b48c'}}>
            <div className="card-body">
              <div className="profile-menu">
                <Link 
                  to="/Account" 
                  style={{ textDecoration: "none", color: "black", fontWeight: "bold", display: "block", padding: "10px 0" }}
                >
                  My Profile
                </Link>

                <Link 
                  to="/Orders" 
                  style={{ textDecoration: "none", color: "black", fontWeight: "bold", display: "block", padding: "10px 0" }}
                >
                  My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-md-9">
          <div className="card" style={{border: '1px solid #d2b48c'}}>
            <div className="card-body">
              <h4 className="card-title">Edit Your Profile</h4>
              <form onSubmit={handleProfileUpdate}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{border: '1px solid #d2b48c'}} 
                      id="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{border: '1px solid #d2b48c'}} 
                      id="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      style={{border: '1px solid #d2b48c', backgroundColor: '#f5f5f5'}} 
                      id="email" 
                      value={formData.email} 
                      readOnly 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      style={{border: '1px solid #d2b48c'}} 
                      id="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                    />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="userImage" className="form-label">User Image</label>
                    <div className="d-flex align-items-center">
                      <img
                        src={imagePreview}
                        alt="User Avatar"
                        className="profile-avatar me-3"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                      <div>
                        <input 
                          className="form-control" 
                          style={{border: '1px solid #d2b48c'}} 
                          type="file" 
                          id="userImage" 
                          onChange={handleFileChange} 
                        />
                        {errors.userImage && <div className="text-danger mt-1">{errors.userImage}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <button 
                      type="submit" 
                      className="btn mb-5 light-brown-btn" 
                      style={{marginLeft: '65%' }}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>

                <hr />
              </form>

              <h5 className="mt-4">Password</h5>
              <form onSubmit={handlePasswordChange}>
                <div className="row mb-3 mt-3">
                  <div className="col-md-12">
                    <label htmlFor="currentPassword" className="form-label">Current password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Current Password" 
                      style={{border: '1px solid #d2b48c'}} 
                      id="currentPassword" 
                      value={formData.currentPassword}
                      onChange={handleChange} 
                    />
                    {passwordErrors.currentPassword && <div className="text-danger">{passwordErrors.currentPassword}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="newPassword" className="form-label">New password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="New Password" 
                      style={{border: '1px solid #d2b48c'}} 
                      id="newPassword" 
                      value={formData.newPassword}
                      onChange={handleChange} 
                    />
                    {passwordErrors.newPassword && <div className="text-danger">{passwordErrors.newPassword}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Confirm Password" 
                      style={{border: '1px solid #d2b48c'}} 
                      id="confirmPassword" 
                      value={formData.confirmPassword}
                      onChange={handleChange} 
                    />
                    {passwordErrors.confirmPassword && <div className="text-danger">{passwordErrors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="submit" 
                    className="btn light-brown-btn" 
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;