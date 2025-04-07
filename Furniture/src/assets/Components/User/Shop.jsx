import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../css/style.css';
import { Link } from "react-router-dom"



// import product1 from '../../images/cart1.png';
// import product2 from '../../images/cart2.png';
// import product3 from '../../images/product-6.jpg';
// import product4 from '../../images/img1.jpg';
// import product5 from '../../images/product-2.jpeg';
// import product6 from '../../images/product-8.jpg';
// import product7 from '../../images/product4.png';
// import product8 from '../../images/product-5.jpeg';
import contactimg from '../../images/contact.jpg';


function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/Product/view-product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
       
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="main-container">
        <div>
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
                        <h1 className="text-white text-center mb-2">Shop</h1>
                        <p className="text-white text-center">Transform Your Space with Elegance</p>
                      </div>
                      </div>
        </div>

<div className="container w-70 mt-5">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div>
    </div>
    <div>
      <button className="btn light-brown-btn me-2" data-bs-toggle="collapse" data-bs-target="#filterCard">
        <i className="bi bi-funnel-fill me-1"></i> Filter
      </button>
      <button className="btn light-brown-btn me-2" data-bs-toggle="collapse" data-bs-target="#filterCard">
        <i className="bi bi-funnel-fill me-1"></i> Clear Filter
      </button>
     
    </div>
  </div>

  <div id="filterCard" className="border p-4 collapse">
    <div className="row">
      <div className="col-md-4">
        <h5>Customer Ratings</h5>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="ratings" id="rating4" />
          <label className="form-check-label" htmlFor="rating4">
            4 <i className="bi bi-star-fill text-warning"></i> and above
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="ratings" id="rating3" />
          <label className="form-check-label" htmlFor="rating3">
            3 <i className="bi bi-star-fill text-warning"></i> and above
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="ratings" id="rating2" />
          <label className="form-check-label" htmlFor="rating2">
            2 <i className="bi bi-star-fill text-warning"></i> and above
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="ratings" id="rating1" />
          <label className="form-check-label" htmlFor="rating1">
            1 <i className="bi bi-star-fill text-warning"></i> and above
          </label>
        </div>
      </div>

      <div className="col-md-4">
        <h5>Price</h5>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="price" id="price1" />
          <label className="form-check-label" htmlFor="price1">
            Less than Rs 50
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="price" id="price2" />
          <label className="form-check-label" htmlFor="price2">
            Rs 51 to 100
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="price" id="price3" />
          <label className="form-check-label" htmlFor="price3">
            Rs 101 to 200
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="price" id="price4" />
          <label className="form-check-label" htmlFor="price4">
            Rs 201 to 500
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="price" id="price5" />
          <label className="form-check-label" htmlFor="price5">
            More than Rs 500
          </label>
        </div>
      </div>

      <div className="col-md-4">
        <h5>Discount</h5>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="discount" id="discount1" />
          <label className="form-check-label" htmlFor="discount1">
            Less than 5%
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="discount" id="discount2" />
          <label className="form-check-label" htmlFor="discount2">
            5% to 15%
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="discount" id="discount3" />
          <label className="form-check-label" htmlFor="discount3">
            15% to 25%
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="discount" id="discount4" />
          <label className="form-check-label" htmlFor="discount4">
            More than 25%
          </label>
        </div>

        <div className="text-end mt-4">
          <button className="btn light-brown-btn">Apply</button>
        </div>
      </div>
    </div>
    
  </div>
  
</div>
 <div className="container my-5">
         
 <div className="row row-cols-1 row-cols-sm-2 mt-5 row-cols-md-4 g-4">
 {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product, index) => (
          <div className="col" key={index}>
            <div className="card h-100 border-light position-relative product-card">
              <div className="position-absolute top-0 start-0 m-2">
                <span className="badge bg-warning text-dark py-2 px-3">SAVE {product.discount || 0}%</span>
              </div>
              <Link to="/Wishlist">
                <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                  <i className="bi bi-heart-fill text-danger"></i>
                </button>
              </Link>
              <img
                src={product.productImage ? `http://127.0.0.1:5000/public/uploads/${product.productImage}` : "https://via.placeholder.com/50"} 
                className="card-img-top p-3"
                alt={product.name}
                style={{ height: "240px", objectFit: "contain" }}
              />
              <Link to={`/ProductDetails/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card-body pb-0">
                  <p className="text-muted mb-1">{product.category || "Category"}</p>
                  <h5 className="card-title">{product.name}</h5>
                  <div className="d-flex align-items-center">
                    <span className="star-rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </span>
                    <span className="ms-1 text-muted">(6)</span>
                  </div>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                  <div className="mt-5">
                    <span className="text fw-bold">₹{product.costPrice}</span>
                    <small className="text-muted ms-2 text-decoration-line-through">
                      ₹{product.salePrice}
                    </small>
                  </div>
                  <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                    <button
                      className="mt-5"
                      style={{
                        border: "1px solid #d2b48c",
                        backgroundColor: "white",
                        color: "black",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease, border-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#a67c52";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "black";
                      }}
                    >
                      <span className="me-1">Add</span>
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        ))
      )}
</div>
          
                      <nav aria-label="Product Pagination">
              <ul className="pagination justify-content-end mt-4">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item disabled">
                  <a className="page-link" href="#">2</a>
                </li>
                
                <li className="page-item disabled">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          
                    </div>
           </div>

);
};

export default Shop


