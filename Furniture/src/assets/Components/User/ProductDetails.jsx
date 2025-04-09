import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



import img1 from '../../images/cart1.png';
import product1 from '../../images/cart1.png';
import product2 from '../../images/cart2.png';
import product3 from '../../images/product-6.jpg';
import product4 from '../../images/img1.jpg';
import product5 from '../../images/product-2.jpeg';
import product6 from '../../images/product-8.jpg';
import product7 from '../../images/product4.png';
import product8 from '../../images/product-5.jpeg';
import { Link } from "react-router-dom"


function ProductDetails() {
  const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  // Fetch product data based on ID
  useEffect(() => {
    axios.get(`http://localhost:5000/api/Product/view-product/${id}`)
    .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // Quantity functions
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) return <div className="container pt-5">Loading...</div>;



   return (
    <div className="container mt-4 mb-5 pt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Shop</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Image */}
        <div className="col-md-5">
          <img
                src={product.productImage ? `http://127.0.0.1:5000/public/uploads/${product.productImage}` : "https://via.placeholder.com/50"} 
                className="img-fluid"
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <h3>{product.name}</h3>
          <p className="text-muted">{product.description}</p>

          {/* Rating */}
          <div className="mb-2">
            ⭐⭐⭐⭐⭐ <span className="text-muted">(8 Reviews)</span>
          </div>

          {/* Price */}
          <h4>₹{product.salePrice}</h4>

          {/* Quantity */}
          <p className="mb-1">Quantity</p>
          <div className="btn-group mb-3">
            <button className="btn btn-outline-dark" onClick={decreaseQuantity}>-</button>
            <button className="btn btn-outline-dark">{quantity}</button>
            <button className="btn btn-outline-dark" onClick={increaseQuantity}>+</button>
            <button className="btn custom-btn ms-3">Add to cart</button>
          </div>
        </div>
      </div>
      

      {/* Customer Reviews */}
      <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mt-5">Customer Reviews</h4>
        <Link to="/Review" style={{ textDecoration: "none", color: "inherit" }}>
        <button className="btn light-brown-btn">Add Review</button>
        </Link>
      </div>

      <p className="text-muted">You need to order first to give a review on this product!</p>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h6>Nirali Akbari ⭐⭐⭐⭐⭐</h6>
            <p>Fantastic! Exceeded my expectations.</p>
            <small className="text-muted">Published on January 12, 2025</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h6>Bhakti Bhut ⭐⭐⭐</h6>
            <p>Not bad, not great.</p>
            <small className="text-muted">Published on February 12, 2025</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h6>Geeta Divraniya ⭐⭐⭐⭐⭐</h6>
            <p>Very Good Products</p>
            <small className="text-muted">Published on march 27, 2025</small>
          </div>
        </div>
      </div>
    </div>


      {/* More Products Section */}
      <h4 className="mt-5">More from UrbanWood</h4>
      <div className="container my-5">
               
               <div className="row row-cols-1 row-cols-sm-2 mt-5 row-cols-md-4 g-4">
                 <div className="col">
                   <div className="card h-100 border-light position-relative product-card">
                     <div className="position-absolute top-0 start-0 m-2">
                       <span className="badge bg-warning text-dark py-2 px-3">SAVE 15%</span>
                     </div>
                     
                  <Link to="/Wishlist" style={{ textDecoration: "none", color: "inherit" }}>
              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                <i className="bi bi-heart-fill text-danger"></i>
              </button>
              </Link>
                     
                     <img src={product2} className="card-img-top p-3" alt="Chocolate" style={{height: '240px', objectFit: 'contain'}} />
                     <Link to="/ProductDetails" style={{ textDecoration: "none", color: "inherit" }}>

                     <div className="card-body pb-0">
                       <p className="text-muted mb-1">Snacks</p>
                       
                       <h5 className="card-title">Chocolate</h5>
                       
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
                       <div>
                         <span className="text-success fw-bold">₹42.50</span>
                         <small className="text-muted ms-2 text-decoration-line-through">₹50.00</small>
                       </div>
                       
                       <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                
                <button className="mt-5"
                      style={{
                        border: "1px solid #d2b48c", // Light brown border
                        backgroundColor: "white", // Default background
                        color: "black", // Default text color
                        padding: "8px 16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease, border-color 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                        e.target.style.color = "white"; // Text color change on hover
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white"; // Default background
                        e.target.style.color = "black"; // Default text color
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
                 
                 <div className="col">
                            <div className="card h-100 border-light position-relative product-card">
                              <div className="position-absolute top-0 start-0 m-2">
                                <span className="badge bg-warning text-dark py-2 px-3">SAVE 48%</span>
                              </div>
                              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                                <i className="bi bi-heart text-danger"></i>
                              </button>
                              <img src={product1} className="card-img-top p-3" alt="Ladies Fingers" style={{height: '240px', objectFit: 'contain'}} />
                              
                              <div className="card-body pb-0">
                                <p className="text-muted mb-1">Chair</p>
                                
                                <h5 className="card-title">Wingback Chair</h5>
                                
                                <div className="d-flex align-items-center">
                                  <span className="star-rating">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                  </span>
                                  <span className="ms-1 text-muted">(1)</span>
                                </div>
                              </div>
                              
                              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="text fw-bold">₹1900.40</span>
                                  <small className="text-muted ms-2 text-decoration-line-through">₹2000.00</small>
                                </div>
                                
                                <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                                
                                <button
                                      style={{
                                        border: "1px solid #d2b48c", // Light brown border
                                        backgroundColor: "white", // Default background
                                        color: "black", // Default text color
                                        padding: "8px 16px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease, border-color 0.3s ease"
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                        e.target.style.color = "white"; // Text color change on hover
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "white"; // Default background
                                        e.target.style.color = "black"; // Default text color
                                      }}
                                    >
                                      <span className="me-1">Add</span>
                                      <i className="bi bi-cart-plus"></i>
                                    </button>
                
                                </Link>
                              </div>
                            </div>
                          </div>
                 
                <div className="col">
                            <div className="card h-100 border-light position-relative product-card">
                              <div className="position-absolute top-0 start-0 m-2">
                                <span className="badge bg-warning text-dark py-2 px-3">SAVE 15%</span>
                              </div>
                              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                                <i className="bi bi-heart text-danger"></i>
                              </button>
                              <img src={product3} className="card-img-top p-3" alt="Beans" style={{height: '240px', objectFit: 'contain'}} />
                              
                              <div className="card-body pb-0">
                                <p className="text-muted mb-1">Cupboard</p>
                                
                                <h5 className="card-title">Display Cupboard</h5>
                                
                                <div className="d-flex align-items-center">
                                  <span className="star-rating">
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                  </span>
                                  <span className="ms-1 text-muted">(0)</span>
                                </div>
                              </div>
                              
                              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="text fw-bold">₹1700.00</span>
                                  <small className="text-muted ms-2 text-decoration-line-through">₹2000.00</small>
                                </div>
                                
                                 
                                <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                                
                                <button
                                      style={{
                                        border: "1px solid #d2b48c", // Light brown border
                                        backgroundColor: "white", // Default background
                                        color: "black", // Default text color
                                        padding: "8px 16px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease, border-color 0.3s ease"
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                        e.target.style.color = "white"; // Text color change on hover
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "white"; // Default background
                                        e.target.style.color = "black"; // Default text color
                                      }}
                                    >
                                      <span className="me-1">Add</span>
                                      <i className="bi bi-cart-plus"></i>
                                    </button>
                
                                </Link>
                
                              </div>
                            </div>
                          </div>
                 
                <div className="col">
                           <div className="card h-100 border-light position-relative product-card">
                             <div className="position-absolute top-0 start-0 m-2">
                               <span className="badge bg-warning text-dark py-2 px-3">SAVE 15%</span>
                             </div>
                             <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                               <i className="bi bi-heart-fill text-danger"></i>
                             </button>
                             <img src={product8} className="card-img-top p-3" alt="Brinjal" style={{height: '240px', objectFit: 'contain'}} />
                             
                             <div className="card-body pb-0">
                               <p className="text-muted mb-1">Chair</p>
                               
                               <h5 className="card-title">Rocking Chair</h5>
                               
                               <div className="d-flex align-items-center">
                                 <span className="star-rating">
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star"></i>
                                 </span>
                                 <span className="ms-1 text-muted">(2)</span>
                               </div>
                             </div>
                             
                             <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                               <div>
                                 <span className="text fw-bold">₹4250.50</span>
                                 <small className="text-muted ms-2 text-decoration-line-through">₹5000.00</small>
                               </div>
                               
                               <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                               
                               <button
                                     style={{
                                       border: "1px solid #d2b48c", // Light brown border
                                       backgroundColor: "white", // Default background
                                       color: "black", // Default text color
                                       padding: "8px 16px",
                                       fontWeight: "bold",
                                       cursor: "pointer",
                                       transition: "background-color 0.3s ease, border-color 0.3s ease"
                                     }}
                                     onMouseEnter={(e) => {
                                       e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                       e.target.style.color = "white"; // Text color change on hover
                                     }}
                                     onMouseLeave={(e) => {
                                       e.target.style.backgroundColor = "white"; // Default background
                                       e.target.style.color = "black"; // Default text color
                                     }}
                                   >
                                     <span className="me-1">Add</span>
                                     <i className="bi bi-cart-plus"></i>
                                   </button>
               
                               </Link>
               
                             </div>
                           </div>
                         </div>
                 <div className="col">
                            <div className="card h-100 border-light position-relative product-card">
                              <div className="position-absolute top-0 start-0 m-2">
                                <span className="badge bg-warning text-dark py-2 px-3">SAVE 15%</span>
                              </div>
                              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                                <i className="bi bi-heart text-danger"></i>
                              </button>
                
                              <img src={product6} className="card-img-top p-3" alt="Brinjal" style={{height: '240px', objectFit: 'contain'}} />
                              
                              <div className="card-body pb-0">
                                <p className="text-muted mb-1">Cupboard</p>
                                
                                <h5 className="card-title">Sideboard</h5>
                                
                                <div className="d-flex align-items-center">
                                  <span className="star-rating">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                  </span>
                                  <span className="ms-1 text-muted">(7)</span>
                                </div>
                              </div>
                              
                              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="text fw-bold">₹2000.50</span>
                                  <small className="text-muted ms-2 text-decoration-line-through">₹2500.00</small>
                                </div>
                                
                                <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                                
                                <button
                                      style={{
                                        border: "1px solid #d2b48c", // Light brown border
                                        backgroundColor: "white", // Default background
                                        color: "black", // Default text color
                                        padding: "8px 16px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease, border-color 0.3s ease"
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                        e.target.style.color = "white"; // Text color change on hover
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "white"; // Default background
                                        e.target.style.color = "black"; // Default text color
                                      }}
                                    >
                                      <span className="me-1">Add</span>
                                      <i className="bi bi-cart-plus"></i>
                                    </button>
                
                                </Link>
                
                              </div>
                            </div>
                          </div>
                <div className="col">
                           <div className="card h-100 border-light position-relative product-card">
                             <div className="position-absolute top-0 start-0 m-2">
                               <span className="badge bg-warning text-dark py-2 px-3">SAVE 15%</span>
                             </div>
                              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                               <i className="bi bi-heart text-danger"></i>
                             </button>
                             <img src={product7} className="card-img-top p-3" alt="Brinjal" style={{height: '240px', objectFit: 'contain'}} />
                             
                             <div className="card-body pb-0">
                               <p className="text-muted mb-1">Chair</p>
                               
                               <h5 className="card-title">Windsor Chair</h5>
                               
                               <div className="d-flex align-items-center">
                                 <span className="star-rating">
                                   <i className="bi bi-star"></i>
                                   <i className="bi bi-star"></i>
                                   <i className="bi bi-star"></i>
                                   <i className="bi bi-star"></i>
                                   <i className="bi bi-star"></i>
                                 </span>
                                 <span className="ms-1 text-muted">(0)</span>
                               </div>
                             </div>
                             
                             <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                               <div>
                                 <span className="text fw-bold">₹4200.50</span>
                                 <small className="text-muted ms-2 text-decoration-line-through">₹5000.00</small>
                               </div>
                               
                               <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                               
                               <button
                                     style={{
                                       border: "1px solid #d2b48c", // Light brown border
                                       backgroundColor: "white", // Default background
                                       color: "black", // Default text color
                                       padding: "8px 16px",
                                       fontWeight: "bold",
                                       cursor: "pointer",
                                       transition: "background-color 0.3s ease, border-color 0.3s ease"
                                     }}
                                     onMouseEnter={(e) => {
                                       e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                       e.target.style.color = "white"; // Text color change on hover
                                     }}
                                     onMouseLeave={(e) => {
                                       e.target.style.backgroundColor = "white"; // Default background
                                       e.target.style.color = "black"; // Default text color
                                     }}
                                   >
                                     <span className="me-1">Add</span>
                                     <i className="bi bi-cart-plus"></i>
                                   </button>
               
                               </Link>
               
                             </div>
                           </div>
                         </div>
                 <div className="col">
                            <div className="card h-100 border-light position-relative product-card">
                              <div className="position-absolute top-0 start-0 m-2">
                                <span className="badge bg-warning text-dark py-2 px-3">SAVE 10%</span>
                              </div>
                              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                                <i className="bi bi-heart text-danger"></i>
                              </button>
                
                              <img src={product4} className="card-img-top p-3" alt="Brinjal" style={{height: '240px', objectFit: 'contain'}} />
                              
                              <div className="card-body pb-0">
                                <p className="text-muted mb-1">Chair</p>
                                
                                <h5 className="card-title">Slipper Chair</h5>
                                
                                <div className="d-flex align-items-center">
                                  <span className="star-rating">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                  </span>
                                  <span className="ms-1 text-muted">(1)</span>
                                </div>
                              </div>
                              
                              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="text fw-bold">₹6200.50</span>
                                  <small className="text-muted ms-2 text-decoration-line-through">₹6500.00</small>
                                </div>
                                
                                <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                                
                                <button
                                      style={{
                                        border: "1px solid #d2b48c", // Light brown border
                                        backgroundColor: "white", // Default background
                                        color: "black", // Default text color
                                        padding: "8px 16px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease, border-color 0.3s ease"
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                        e.target.style.color = "white"; // Text color change on hover
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "white"; // Default background
                                        e.target.style.color = "black"; // Default text color
                                      }}
                                    >
                                      <span className="me-1">Add</span>
                                      <i className="bi bi-cart-plus"></i>
                                    </button>
                
                                </Link>
                
                              </div>
                            </div>
                          </div>
                <div className="col">
                           <div className="card h-100 border-light position-relative product-card" style={{
                                 filter: "blur(1px)", // Blurred effect
                                 opacity: "0.9", // Reduce visibility
                                 pointerEvents: "none", // Disable clicks
                               }}>
                             <div className="position-absolute top-0 start-0 m-2">
                               <span className="badge bg-warning text-dark py-2 px-3">OUT OF STOCK</span>
                             </div>
                              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                               <i className="bi bi-heart text-danger"></i>
                             </button>
                             <img src={product5} className="card-img-top p-3" alt="Brinjal" style={{height: '240px', objectFit: 'contain'}} />
                             
                             <div className="card-body pb-0">
                               <p className="text-muted mb-1">Chair</p>
                               
                               <h5 className="card-title">Accent Chair</h5>
                               
                               <div className="d-flex align-items-center">
                                 <span className="star-rating">
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                 </span>
                                 <span className="ms-1 text-muted">(10)</span>
                               </div>
                             </div>
                             
                             <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                               <div>
                                 <span className="text fw-bold">₹7500.00</span>
                                 <small className="text-muted ms-2 text-decoration-line-through">₹7700.00</small>
                               </div>
                               
                               <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                               
                               <button
                                     style={{
                                       border: "1px solid #d2b48c", // Light brown border
                                       backgroundColor: "white", // Default background
                                       color: "black", // Default text color
                                       padding: "8px 16px",
                                       fontWeight: "bold",
                                       cursor: "pointer",
                                       transition: "background-color 0.3s ease, border-color 0.3s ease"
                                     }}
                                     onMouseEnter={(e) => {
                                       e.target.style.backgroundColor = "#d2b48c"; // Light brown on hover
                                       e.target.style.color = "white"; // Text color change on hover
                                     }}
                                     onMouseLeave={(e) => {
                                       e.target.style.backgroundColor = "white"; // Default background
                                       e.target.style.color = "black"; // Default text color
                                     }}
                                   >
                                     <span className="me-1">Add</span>
                                     <i className="bi bi-cart-plus"></i>
                                   </button>
               
                               </Link>
               
                             </div>
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
                 </div>

      {/* Custom Styles */}
      <style>
        {`
          .custom-btn {
            background-color: #D2B48C !important;
            border-color: #D2B48C !important;
            color: white;
            transition: 0.3s;
          }
          .custom-btn:hover {
            background-color: #c2a176 !important;
            border-color: #c2a176 !important;
          }
          .breadcrumb-item a {
            color: #8B4513;
            text-decoration: none;
          }
          .breadcrumb-item.active {
            color: #D2B48C;
          }
          .btn-outline-secondary {
            min-width: 40px;
          }
        `}
      </style>
      </div>
  );
}

export default ProductDetails;
