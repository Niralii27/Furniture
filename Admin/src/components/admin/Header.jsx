import React, { useState,useEffect  } from 'react'
import { Link } from 'react-router-dom'
const Header = ({toggleSidebar}) => {
    
  
  //const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = urlParams.get('userData');
    
    if (userData) {
      const user = JSON.parse(decodeURIComponent(userData));
      setUser(user);
      localStorage.setItem("admin", JSON.stringify(user)); // Keep key consistent
    }
  }, []);
  
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      window.location.replace("http://localhost:5173/Login");
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.replace("http://localhost:5173/Login");
  };
  
  
  return (
    <nav className="sb-topnav navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#001F3F" }}>

        <Link className="navbar-brand ps-3" to="/admin" style={{ color: "white" }} >
        <img src="/img/favicon.jpg" alt="Logo" style={{ height: "30px", marginRight: "10px" }} />
      𝕌𝕣𝕓𝕒𝕟𝕎𝕠𝕠𝕕
  
        </Link>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={toggleSidebar}

>
          <i className="fas fa-bars"  style={{ color: "white" }}></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          {/* <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" id="btnNavbarSearch" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div> */}
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "white" }}>

            <img
                src={user?.userImage ? `http://127.0.0.1:5000/public/uploads/${user.userImage}` : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                alt="User Profile"
              className="rounded-circle me-2"
              width="35"
              height="35"
            />

              {/* <i className="fas fa-user fa-fw"></i> */}
              {user?.fullname}
                          </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/admin/my-profile">
                  Settings
                </Link>
              </li>
              <li>
              <Link 
  className="dropdown-item" 
  to="#" 
  onClick={(e) => {
    e.preventDefault();
    handleLogout();
  }}
>
  Logout
</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
  )
}

export default Header