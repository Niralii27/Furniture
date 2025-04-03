import React, { useState } from 'react';
import '../../css/checkout.css'; 
import { Link, useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: ''
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error when user types
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    // Pin code validation (6 digits for Indian pin code)
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Pin code must be 6 digits';
    }
    
    // Phone validation (10 digits for Indian phone numbers)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save address logic here
      console.log('Form data submitted:', formData);
      
      // Navigate to checkout page
      navigate('/Checkout');
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="container me-5 mt-5 pt-5">
      <div className="row">
        {/* Billing Details Section */}
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Billing Details</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First Name<span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className={`form-control bg-light ${errors.firstName ? 'is-invalid' : ''}`} 
                  id="firstName" 
                  placeholder="First Name" 
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name<span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className={`form-control bg-light ${errors.lastName ? 'is-invalid' : ''}`} 
                  id="lastName" 
                  placeholder="Last Name" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="streetAddress" className="form-label">Street Address<span className="text-danger">*</span></label>
              <input 
                type="text" 
                className={`form-control bg-light ${errors.streetAddress ? 'is-invalid' : ''}`} 
                id="streetAddress" 
                placeholder="Street Address" 
                value={formData.streetAddress}
                onChange={handleChange}
              />
              {errors.streetAddress && <div className="invalid-feedback">{errors.streetAddress}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="apartment" className="form-label">Apartment, Floor, etc.(Optional)</label>
              <input 
                type="text" 
                className="form-control bg-light" 
                id="apartment" 
                placeholder="Apartment, Floor, etc." 
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">City<span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className={`form-control bg-light ${errors.city ? 'is-invalid' : ''}`} 
                  id="city" 
                  placeholder="City" 
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="state" className="form-label">State<span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className={`form-control bg-light ${errors.state ? 'is-invalid' : ''}`} 
                  id="state" 
                  placeholder="State" 
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="pinCode" className="form-label">Pin Code<span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className={`form-control bg-light ${errors.pinCode ? 'is-invalid' : ''}`} 
                  id="pinCode" 
                  placeholder="Pin Code"

                  maxLength="6"
                  value={formData.pinCode}
                  onChange={handleChange}
                />
                {errors.pinCode && <div className="invalid-feedback">{errors.pinCode}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">Phone<span className="text-danger">*</span></label>
                <input 
                  type="tel" 
                  className={`form-control bg-light ${errors.phone ? 'is-invalid' : ''}`} 
                  id="phone" 
                  placeholder="Phone Number" 
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>

            <div className="text-center mb-4">
              <button type="submit" className="btn light-brown-btn me-3">Save Address</button>
              <Link to="/Checkout" style={{ textDecoration: "none", color: "inherit" }}>
                <button type="button" className="btn light-brown-btn">Close</button>
              </Link>
            </div>

            <hr />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;