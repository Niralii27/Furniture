import React from 'react';
import '../../css/header.css'; 
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
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
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                alt="User" 
                className="rounded-circle me-1" 
                style={{ width: '30px', height: '30px', objectFit: 'cover' }}
              />
             <span className="d-none d-md-inline text-muted ms-2">Nirali</span>
</button>
<ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="userDropdown">
  <li className="px-3 py-2 d-block d-md-none text-center">
    <strong>Nirali</strong>
  </li>
  <li className="d-block d-md-none"><hr className="dropdown-divider m-0" /></li>
  <li><Link className="dropdown-item py-2" to="/Account"><i className="fas fa-user me-2 text-brown"></i>Profile</Link></li>
  <li><Link className="dropdown-item py-2" to="/Orders"><i className="fas fa-shopping-bag me-2 text-brown"></i>Orders</Link></li>
  <li><hr className="dropdown-divider" /></li>
  <li><Link className="dropdown-item py-2" to="/Login"><i className="fas fa-sign-out-alt me-2 text-brown"></i>Login</Link></li>

  <li><Link className="dropdown-item py-2" to="/Login"><i className="fas fa-sign-out-alt me-2 text-brown"></i>Logout</Link></li>
</ul>
</div>
            
            {/* Wishlist */}
            <Link to="/Wishlist" className="btn position-relative ms-3">
              <i className="far fa-heart fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown">
                2
              </span>
            </Link>
            
            {/* Cart */}
            <Link to="/Cart" className="btn position-relative ms-2">
              <i className="fas fa-shopping-cart fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;