import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarToggled }) => {
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { to: "/admin/products", label: "Products", icon: "fas fa-box" },
    { to: "/admin/categories", label: "Categories", icon: "fas fa-tags" },
    { to: "/admin/orders", label: "Orders", icon: "fas fa-shopping-cart" },
    { to: "/admin/users", label: "Customers", icon: "fas fa-user" },
    { to: "/admin/reviews", label: "Rating & Reviews", icon: "fas fa-star" },
    { to: "/admin/offers", label: "Offers", icon: "fas fa-gift" },
    { to: "/admin/contacts", label: "Contact", icon: "fas fa-phone" },
    { to: "/admin/responses", label: "Response", icon: "fas fa-envelope" },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname === path + "/";
  };

  return (
    <div
      id="layoutSidenav_nav"
      className={isSidebarToggled ? "sb-sidenav-toggled" : ""}
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        style={{
          backgroundColor: "#001F3F",
          minHeight: "100vh",
          overflowY: "auto",
          paddingTop: "70px",
        }}
      >
        <div className="sb-sidenav-menu px-3">
          <div className="nav">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`nav-link d-flex align-items-center rounded ${
                  isActive(item.to) ? "active" : ""
                }`}
                style={{
                  color: isActive(item.to) ? "#fff" : "#ccc",
                  backgroundColor: isActive(item.to) ? "#0d6efd" : "transparent",
                  marginBottom: "10px",
                  transition: "0.2s",
                  fontSize: "15px",
                  padding: "10px 15px",
                }}
              >
                <i className={`${item.icon} me-3`} style={{ width: "20px" }}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <style jsx="true">{`
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff !important;
        }
        .nav-link.active {
          box-shadow: inset 4px 0 0 #fff;
        }
        .sb-sidenav-menu {
          scrollbar-width: thin;
        }
        .sb-sidenav-menu::-webkit-scrollbar {
          width: 6px;
        }
        .sb-sidenav-menu::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
