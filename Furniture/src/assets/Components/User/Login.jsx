import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

import "../../css/login.css"; // You'll need to create this CSS file
import "../../js/login.js";

function Login() {
  // State to track which form is active
   const [isLoginActive, setIsLoginActive] = useState(true);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();


  // Form data states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation states
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const [signupErrors, setSignupErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    // Reset errors when switching forms
    setLoginErrors({
      email: "",
      password: "",
    });
    setSignupErrors({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return "";
  };

  // Handle login form input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // Clear errors when typing
    setLoginErrors({
      ...loginErrors,
      [name]: "",
    });
  };

  // Handle signup form input changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignupData({
      ...signupData,
      [name]: value,
    });

    // Clear errors when typing
    setSignupErrors({
      ...signupErrors,
      [name]: "",
    });
  };

  // Handle login form submission with validation
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Validate email
    let hasErrors = false;
    const newLoginErrors = { email: "", password: "" };

    if (!validateEmail(loginData.email)) {
      newLoginErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    if (loginData.password.trim() === "") {
      newLoginErrors.password = "Password is required";
      hasErrors = true;
    }

    setLoginErrors(newLoginErrors);

    if (!hasErrors) {
      // console.log("Login data:", loginData);
      // Add your login logic here
    }
  };

  // Handle signup form submission with validation
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newSignupErrors = {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Username validation
    if (signupData.fullname.trim().length < 3) {
      newSignupErrors.fullname = "Username must be at least 3 characters long";
      hasErrors = true;
    } else if (/\d/.test(signupData.fullname)) {
      newSignupErrors.fullname = "Numbers are not allowed in username";
      hasErrors = true;
    }

    // Email validation
    if (!validateEmail(signupData.email)) {
      newSignupErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    // Password validation
    const passwordError = validatePassword(signupData.password);
    if (passwordError) {
      newSignupErrors.password = passwordError;
      hasErrors = true;
    }

    // Confirm password validation
    if (signupData.password !== signupData.confirmPassword) {
      newSignupErrors.confirmPassword = "Passwords do not match";
      hasErrors = true;
    }

    setSignupErrors(newSignupErrors);

    if (!hasErrors) {
      console.log("Signup data:", signupData);
      // Add your signup logic here
    }
  };

  //Backend code for Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("\n\n123 :  ", loginData);


    try {
      const { data } = await axios.post("http://localhost:5000/api/Login/login",
        loginData
      );

       // Store user token and details
       localStorage.setItem(`${data.user.role}token`, data.token);
       localStorage.setItem(data.user.role, JSON.stringify(data.user));

       // If user is admin, store admin info separately
      //  localStorage.setItem(data.admin.role, JSON.stringify(data.admin));  // Storing admin details if role is "admin"
   
      //  console.log("Admin data stored in localStorage:", JSON.parse(localStorage.getItem("admin")));

      //  setStatusMessage(data.message);
      //  setStatusType(data.status);
      // if (data.user.role === "admin") {
       
      //  window.location.href = "http://localhost:5174/admin";
      if (data.user.role === "admin") {
        const encodedUser = encodeURIComponent(JSON.stringify(data.user));
        window.location.href = `http://localhost:5174/admin?userData=${encodedUser}`;
      
      } else {
        navigate("/home");
        window.location.reload();
      }
      
      //  setTimeout(() => {
        // navigate(data.user.role === "admin" ? "/Admin/admin/src/pages/Dashboard" : "/Home");
      // }, 2000);
    } catch (error) {
      // setStatusMessage(error.response?.data?.message || "Invalid credentials. Please try again!");
      // setStatusType(error.response?.data?.status || "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; 

  //veloraa1920 
  //rtepefdygepi
  
  //backend code for registration

  const handleSubmit = async (e) => {
    console.log("nirali ", signupData);
    e.preventDefault();
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/Login/add-user",
        signupData
      );

      console.log("User added:", response.data);
      alert("User added successfully. Check your email to verify your account.!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Your Email Address already registered !");
    }
  };

  if (loading){
    return(
      <div>
        Loading
      </div>
    )
  }

  return (
    <div className="main-container1 mt-5 pt-5">
      <div className="form-wrapper">
        <div className="form-content">
          {/* Login Form */}
          <form onSubmit={handleLogin} id="login_form" 
            className={`form login-form ${isLoginActive ? "active" : ""}`}
            onChange={handleLoginSubmit}
          >
            <h2>Welcome Back!</h2>
            <p>Login to your account to continue</p>
            <div className="input-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={loginErrors.email ? "error" : ""}
              />
              <span className="input-icon">📧</span>
              {loginErrors.email && (
                <div className="error-message">{loginErrors.email}</div>
              )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={loginErrors.password ? "error" : ""}
              />
              <span className="input-icon">🔒</span>
              {loginErrors.password && (
                <div className="error-message">{loginErrors.password}</div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button type="submit" className="btn light-brown-btn">
                Login
              </button>
              <p className="switch-text" style={{ marginLeft: '10px', cursor: 'pointer',color:"blue" }}
               onClick={() => navigate('/ForgotPassword')}
               >
                ForgotPassword
              </p>
            </div>

            <p className="switch-text">
              Don't have an account?{" "}
              <span className="toggle-form" onClick={toggleForm}>
                Sign Up
              </span>
            </p>
          </form>

          {/* Signup Form */}
          <form
            method="post"
            id="register_form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className={`form signup-form ${!isLoginActive ? "active" : ""}`}
            onChange={handleSignupSubmit}
          >
            <h2>Create Account</h2>
            <p>Sign up to explore new opportunities</p>
            <div className="input-group">
              <input
                type="text"
                name="fullname"
                placeholder="Username"
                value={signupData.fullname}
                onChange={handleSignupChange}
                className={signupErrors.fullname ? "error" : ""}
              />
              <span className="input-icon">👤</span>
              {signupErrors.fullname && (
                <div className="error-message">{signupErrors.fullname}</div>
              )}
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                className={signupErrors.email ? "error" : ""}
              />
              <span className="input-icon">📧</span>
              {signupErrors.email && (
                <div className="error-message">{signupErrors.email}</div>
              )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className={signupErrors.password ? "error" : ""}
              />
              <span className="input-icon">🔒</span>
              {signupErrors.password && (
                <div className="error-message">{signupErrors.password}</div>
              )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                className={signupErrors.confirmPassword ? "error" : ""}
              />
              <span className="input-icon">🔒</span>
              {signupErrors.confirmPassword && (
                <div className="error-message">
                  {/* {signupErrors.confirmPassword} */}
                </div>
              )}
            </div>
            <button type="submit" className="btn light-brown-btn">
              Sign Up
            </button>
            <p className="switch-text">
              Already have an account?{" "}
              <span className="toggle-form" onClick={toggleForm}>
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
