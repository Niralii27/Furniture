import React, { useState } from 'react';
import axios from "axios";
import contactimg from '../../images/contact.jpg';

function ContactUs() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Error state
  const [errors, setErrors] = useState({});
  
  // Success message state
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation - now required
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // Subject validation - now required
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, submit the data
      console.log("Form submitted:", formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Show success message
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }
  };


//backend code for contact
 const handlecontact = async (e) => {
    console.log("nirali ", formData);
    e.preventDefault();
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/Contact/add-contact",
        formData
      );

      console.log("Contact added:", response.data);
      setSubmitSuccess(true); 
      } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Your Contact Not Send!");
    }
  };


  return (
    <div className="contact-page">
      {/* Hero Section with Background Image */}
      <div className="hero-section position-relative" style={{
    backgroundImage: `url(${contactimg})`,
        backgroundPosition: 'center',
        height: '50vh',
        position: 'relative'
      }}>
        <div className="overlay position-absolute w-100 h-100" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}></div>
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center position-relative">
          <h1 className="text-white text-center mb-2">Contact us</h1>
          <p className="text-white text-center">keep in touch with us</p>
        </div>
      </div>

      {/* Contact Information and Form Section */}
      <div className="container my-5">
        <div className="row">
          {/* Left Column - Contact Information */}
          <div className="col-md-5 mb-4 mb-md-0">
          
            <div className="mt-3">
              <h3 className="mb-4">Get in touch</h3>
              
              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-geo-alt text-primary"></i>
                </div>
                <div>
                  <p className="mb-0">727 Backbone Park,</p>
                  <p className="mb-0">150 Feet Ring Road, Rajkot, Gujarat</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-clock text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-0">The Office</h5>
                  <p className="mb-2">Monday-Saturday</p>
                  <p className="mb-0">11am-7pm</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-calendar text-primary"></i>
                </div>
                <div>
                  <p className="mb-0">Sunday</p>
                  <p className="mb-0">11am-6pm</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-telephone text-primary"></i>
                </div>
                <div>
                  <p className="mb-0">+91 97979 79797</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <i className="bi bi-envelope text-primary"></i>
                </div>
                <div>
                  <p className="mb-0">furni7@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="col-md-7">
            <div className="contact-form">
              <h2 className="mb-4">Got Any Questions?</h2>
              <p className="text-muted mb-4">Use the form below to get in touch with the sales team</p>

              {submitSuccess && (
                <div className="alert alert-success" role="alert">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handlecontact} onChange={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Name *" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email *" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      type="tel" 
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Phone *" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      type="text" 
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      placeholder="Subject *" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <textarea 
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    rows="5" 
                    placeholder="Message *"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <div className="text-start">
                  <button type="submit" className="btn light-brown-btn px-4">
                    SUBMIT <i className="bi bi-arrow-right ms-2"></i>
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

export default ContactUs;