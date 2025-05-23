import React, { useState, useEffect } from "react";
import '../../css/header.css'; 
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
import axios from "axios";

// logo from '../../images/logo.jpeg';

<ul className="navbar-nav mx-auto mb-2 mb-lg-0">
  <li className="nav-item">
    <NavLink className="nav-link px-3" to="/Home" activeClassName="active-link">
      Home
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link px-3" to="/Shop" activeClassName="active-link">
      Shop
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link px-3" to="/ContactUs" activeClassName="active-link">
      Contact
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link px-3" to="/About" activeClassName="active-link">
      About
    </NavLink>
  </li>
</ul>


//import person1 from '../../images/person_4.jpg';

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  console.log("user:",userId);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    window.location.href = "/Login"; // Redirect to Login
  };

  const [wishlistCount, setWishlistCount] = useState(0);

  
 // Create a function to get wishlist count
const getWishlistCount = () => {
  if (user) {
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
    return wishlist.length;
  }
  return 0;
};

// Add this effect to listen for wishlist changes
useEffect(() => {
  // Initial load
  setWishlistCount(getWishlistCount());
  
  // Create a function to handle wishlist updates
  const handleWishlistUpdate = () => {
    setWishlistCount(getWishlistCount());
  };
  
  // Set up an interval to check wishlist count periodically
  const intervalId = setInterval(handleWishlistUpdate, 1000);
  
  // Clean up the interval when component unmounts
  return () => clearInterval(intervalId);
}, [userId]);

  // const [cartCount, setCartCount] = useState(0);

  //       useEffect(() => {
  //         const fetchCart = async () => {
  //           if (!userId) return;
  //           try {
  //             const res = await axios.get(`http://localhost:5000/api/cart/user/${userId}`);
  //             const cartItems = res.data;
          
  //             const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  //             setCartCount(totalItems);

  //           } catch (err) {
  //             console.error("Failed to fetch cart", err);
  //           }
  //         };
          

  //         fetchCart();
  //       }, [userId]);
        
  const [cartCount, setCartCount] = useState(0);

// Function to fetch cart data
const fetchCart = async () => {
  if (!userId) return;
  try {
    const res = await axios.get(`http://localhost:5000/api/cart/user/${userId}`);
    const cartItems = res.data;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  } catch (err) {
    console.error("Failed to fetch cart", err);
  }
};

// Set up polling to check for cart changes
useEffect(() => {
  // Initial fetch
  fetchCart();
  
  // Check every 2 seconds for changes
  const intervalId = setInterval(fetchCart, 1000);
  
  // Clean up on unmount
  return () => clearInterval(intervalId);
}, [userId]);
  
//search 


  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/Home">
      {/* <img 
        src={logo} 
        alt="Urban Wood Logo" 
        height="40" 
        className="me-2" 
      /> */}
      <div>
        <span className="text-brown fw-bold fs-3">𝕌𝕣𝕓𝕒𝕟</span>
        <span className="text-brown fs-3">𝕎𝕠𝕠𝕕</span>
      </div>
    </Link>
        
        {/* Toggle Button for Mobile */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link px-3" to="/Home" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link px-3" to="/Shop" activeClassName="active-link">
              Shop
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link px-3" to="/ContactUs" activeClassName="active-link">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link px-3" to="/About" activeClassName="active-link">
              About
            </NavLink>
          </li>
        </ul>
          
          {/* Search Bar */}
          <form className="d-flex me-auto search-form">
            <div className="position-relative">
              <input 
                className="form-control rounded-pill bg-light border-0 search-input" 
                type="search" 
                placeholder="Search for items..." 
              />
              <button className="btn btn-brown rounded-circle search-button" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          
          {/* User Profile & Icons */}
          <div className="d-flex align-items-center">
            {/* User Profile */}
            <div className="dropdown">
              <button 
                className="btn btn-link text-decoration-none dropdown-toggle user-dropdown" 
                type="button" 
                id="userDropdown" 
                data-bs-toggle="dropdown"
              >
              <img
                src={user?.userImage ? `http://127.0.0.1:5000/public/uploads/${user.userImage}` : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                alt="User"
                className="rounded-circle me-1"
                style={{ width: '30px', height: '30px', objectFit: 'cover' }}
              />

              <span className="d-none d-md-inline text-muted ms-2">
                {user?.fullname ? ` ${user.fullname}` : "Guest!"}
              </span>
             {/* <span className="d-none d-md-inline text-muted ms-2">Nirali</span> */}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="userDropdown">
              <li className="px-3 py-2 d-block d-md-none text-center">
                <strong>Nirali</strong>
              </li>
              <li className="d-block d-md-none"><hr className="dropdown-divider m-0" /></li>
              <li>
              <Link
                className="dropdown-item py-2"
                to={localStorage.getItem("user") ? "/Account" : "/login"}
              >
                <i className="fas fa-user me-2 text-brown"></i>Profile
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item py-2"
                to={localStorage.getItem("user") ? "/Orders" : "/login"}
              >
                <i className="fas fa-shopping-bag me-2 text-brown"></i>Orders
              </Link>
            </li>

              <li><hr className="dropdown-divider" /></li>
              {!userId && (
              <li>
                <Link className="dropdown-item py-2" to="/Login">
                  <i className="fas fa-sign-out-alt me-2 text-brown"></i>Login
                </Link>
              </li>
            )}

              <li>
              {userId && (
                <button className="dropdown-item py-2" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2 text-brown"></i>Logout
                </button>
              )}

              </li>
            </ul>
            </div>
                        
            {/* Wishlist */}
           <Link
        to={localStorage.getItem("user") ? "/Wishlist" : "/login"}
        className="btn position-relative ms-3"
      >
        <i className="far fa-heart fs-5 text-secondary"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown">
          {wishlistCount}
        </span>
      </Link>

            
            {/* Cart */}
            <Link to={userId ? "/Cart" : "/login"} className="btn position-relative ms-2">
              <i className="fas fa-shopping-cart fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;