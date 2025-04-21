import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "../../css/login.css";

function ResetPassword() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token validity when component mounts
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:5000/api/Login/verify-reset-token/${token}`);
        setTokenValid(true);
      } catch (err) {
        setTokenValid(false);
        setError("This password reset link is invalid or has expired.");
      }
    };
    
    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!passwords.newPassword) {
      setError("New password is required");
      return false;
    }
    
    if (passwords.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      await axios.post(`http://localhost:5000/api/Login/reset-password/${token}`, {
        newPassword: passwords.newPassword,
      });
      
      setSuccess(true);
      setLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  if (!tokenValid) {
    return (
      <div className="main-container1 mt-5 pt-5">
        <div className="form-wrapper">
          <div className="form-content">
            <div className="form reset-password-form active">
              <h2>Invalid Link</h2>
              <p>
                This password reset link is invalid or has expired. Please request a new password reset link.
              </p>
              <button 
                onClick={() => navigate("/Forgotpassword")} 
                className="btn light-brown-btn"
              >
                Request New Link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container1 mt-5 pt-5">
      <div className="form-wrapper">
        <div className="form-content">
          {!success ? (
            <form onSubmit={handleSubmit} className="form reset-password-form active">
              <h2>Reset Your Password</h2>
              <p>Please enter a new password for your account</p>
              
              <div className="input-group">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className={error && error.includes("Password") ? "error" : ""}
                />
                <span className="input-icon">🔒</span>
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className={error && error.includes("match") ? "error" : ""}
                />
                <span className="input-icon">🔒</span>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button 
                type="submit" 
                className="btn light-brown-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <div className="form reset-password-form active">
              <h2>Password Reset Successful!</h2>
              <p>
                Your password has been reset successfully. You will be redirected to the login page.
              </p>
              <button 
                onClick={() => navigate("/login")} 
                className="btn light-brown-btn"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;