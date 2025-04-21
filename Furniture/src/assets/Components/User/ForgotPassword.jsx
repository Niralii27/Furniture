import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../css/login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First check if the email exists in the database
      const checkEmailResponse = await axios.post("http://localhost:5000/api/Login/check-email", { email });
      
      if (!checkEmailResponse.data.exists) {
        setLoading(false);
        setError("Email is not registered in our system.");
        return;
      }
      
      // If email exists, send the reset password link
      await axios.post("http://localhost:5000/api/Login/forgot-password", { email });
      setEmailSent(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <div className="main-container1 mt-5 pt-5">
      <div className="form-wrapper">
        <div className="form-content">
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="form forgot-password-form active">
              <h2>Forgot Password</h2>
              <p>Enter your registered email to receive a password reset link</p>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={error ? "error" : ""}
                />
                <span className="input-icon">📧</span>
                {error && <div className="error-message">{error}</div>}
              </div>
              <button 
                type="submit" 
                className="btn light-brown-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Send Reset Link"}
              </button>
              <p className="switch-text">
                Remember your password?{" "}
                <span 
                  className="toggle-form" 
                  onClick={() => navigate("/Login")}
                >
                  Login
                </span>
              </p>
            </form>
          ) : (
            <div className="form forgot-password-form active">
              <h2>Email Sent</h2>
              <p>
                A password reset link has been sent to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <button 
                onClick={() => navigate("/Login")} 
                className="btn light-brown-btn"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;