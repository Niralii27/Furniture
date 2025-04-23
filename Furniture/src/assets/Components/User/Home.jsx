import React, { useState, useEffect } from 'react';
import axios from 'axios';import '../../css/style.css';
import '../../css/swiper-bundle.min.css';
import '../../js/swiper-bundle.min.js';
import { Link } from "react-router-dom"


import slider1 from '../../images/slider2.jpeg';
import slider2 from '../../images/slider1.jpg';
// import product1 from '../../images/cart1.png';
// import product2 from '../../images/cart2.png';
// import product3 from '../../images/product-6.jpg';
// import product4 from '../../images/img1.jpg';
// import product5 from '../../images/product-2.jpeg';
// import product6 from '../../images/product-8.jpg';
// import product7 from '../../images/product4.png';
// import product8 from '../../images/product-5.jpeg';
import selling1 from '../../images/Selling/selling1.jpg';
import selling2 from '../../images/Selling/selling2.jpg';
import selling3 from '../../images/Selling/selling3.jpg';
import selling4 from '../../images/Selling/selling4.jpg';
import selling5 from '../../images/Selling/selling5.jpg';
import selling6 from '../../images/Selling/selling6.jpg';
import selling7 from '../../images/Selling/selling7.jpg';
import selling8 from '../../images/Selling/selling8.jpg';
import selling9 from '../../images/Selling/selling13.jpg';
import underline from '../../images/Selling/underline.png';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';



function Home() {

  
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  const userId = user?.id;
  console.log("UserId from localStorage:", userId);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

    // 🟡 Calculate current products to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const [categories, setCategories] = useState([]); // To store categories
    

  useEffect(() => {
    fetchProducts();
    fetchCategories();

  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/Product/view-product")
      .then((response) => {
        const filteredProducts = response.data.filter(product => product.discount > 2);

        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
       
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  //best selling
  

  const fetchCategories = () => {
    axios.get("http://localhost:5000/api/Category/view-category")  // Assuming you have an API to fetch categories
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
        });
};
// Get category name by category ID
const getCategoryNameById = (categoryId) => {
  const category = categories.find((cat) => cat._id === categoryId);
  return category ? category.name : "Unknown";
};

//Add To Cart
        const addToCart = async (productId, costPrice, productImage) => {
          if (!userId) {
            alert("Please log in to add items to cart.");
            return;
          }

          try {
            await axios.post("http://localhost:5000/api/Cart/add", {
              userId,
              productId,
              quantity: 1,
              productImage,
              costPrice,
            });

            alert("Item added to cart!");
          } catch (error) {
            console.error("Add to cart error:", error);
            alert("Failed to add item to cart.");
          }
        };

//WishList 

        const [wishlist, setWishlist] = useState(() => {
          const saved = localStorage.getItem(`wishlist_${userId}`) || "[]";
          return JSON.parse(saved);
        });

        const [setWishlistCount] = useState(wishlist.length);

        // Function to check if a product is wishlisted
        const isProductWishlisted = (productId) => {
          return wishlist.includes(productId);
        };

        // Toggle wishlist for a specific product
        const handleWishlistToggle = (productId) => {
          let updatedWishlist;
          if (wishlist.includes(productId)) {
            // Remove from wishlist
            updatedWishlist = wishlist.filter(id => id !== productId);
          } else {
            // Add to wishlist
            updatedWishlist = [...wishlist, productId];
          }

          // Update localStorage & state
          localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
          setWishlist(updatedWishlist);
          setWishlistCount(updatedWishlist.length); // Update wishlist count after change

        };

         //for rating
  const [ratings, setRatings] = useState({});
  const fetchRatings = async () => {
    try {
      const allRatings = {};
      for (const product of currentProducts) {
        const res = await axios.get(`http://localhost:5000/api/Review/reviews/product/${product._id}`);
        allRatings[product._id] = {
          rating: res.data.averageRating,
          totalReviews: res.data.totalReviews,
        };
      }
      setRatings(allRatings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    if (currentProducts.length > 0) {
      fetchRatings();
    }
  }, [currentProducts]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  
  return (
    <div className="main-container">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slider1} className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={slider2} className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src={slider1} className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      <div className="text-center mt-5 pt-5 mt-md-6 mt-lg-7">
        <h1>Exclusive Offers</h1>
        <img src={underline} alt="" style={{ height: '5px' }} />

      </div>

      <div className="container my-5">
        <h2 className="mb-4">Featured products</h2>
        


   <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">

         {loading ? (
                      <p>Loading...</p>
                    ) : (
                      currentProducts.map((product, index) => (
                        <div className="col" key={index}>
                      <div className="card h-100 border-light position-relative product-card">
                        <div className="position-absolute top-0 start-0 m-2">
                          <span className="badge bg-warning text-dark py-2 px-3">SAVE {product.discount || 0}%</span>
                        </div>
                        <Link to="/Wishlist">
                                       <button
                         className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn"
                         onClick={() => handleWishlistToggle(product._id)}
                       >
                         <i className={`bi ${isProductWishlisted(product._id) ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
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
                            <p className="text-muted mb-1">{getCategoryNameById(product.category) || "Category"}</p>
                            <h5 className="card-title">{product.name}</h5>
                            <div className="d-flex align-items-center">
                            <span className="star-rating">
                              {Array.from({ length: 5 }, (_, i) => {
                                const rating = ratings[product._id]?.rating || 0;
                                if (i + 1 <= Math.floor(rating)) {
                                  return <i key={i} className="bi bi-star-fill"></i>;
                                } else if (i < rating) {
                                  return <i key={i} className="bi bi-star-half"></i>;
                                } else {
                                  return <i key={i} className="bi bi-star"></i>;
                                }
                              })}
                            </span>
                            <span className="ms-1 text-muted">
                              ({ratings[product._id]?.totalReviews || 0})
                            </span>
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
                        onClick={() => addToCart(product._id, product.costPrice, product.productImage)} 
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
                                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                      className="page-link"
                                      style={currentPage === 1 ? { backgroundColor: "white", color: "#a67c52" } : {}}
                                      onClick={() => setCurrentPage(prev => prev - 1)}
                                      disabled={currentPage === 1}
                                    >
                                      Previous
                                    </button>
                                  </li>
        
                                  {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item  ${currentPage === i + 1 ? "active" : ""}`}>
                                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                        {i + 1}
                                      </button>
                                    </li>
                                  ))}
        
                                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                  <button
                                    className="page-link"
                                    style={currentPage === totalPages ? { backgroundColor: "white", color: "#a67c52" } : {}}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage === totalPages}
                                  >
                                    Next
                                  </button>
                                  </li>
                                </ul>
                              </nav>
        

          {/* <div className="col">
            <div className="card h-100 border-light position-relative product-card">
              <div className="position-absolute top-0 start-0 m-2">
                <span className="badge bg-warning text-dark py-2 px-3">SAVE 15%</span>
              </div>
              <Link to="/Wishlist">
              <button className="position-absolute top-0 end-0 btn m-2 p-1 rounded-circle bg-light wishlist-btn">
                <i className="bi bi-heart-fill text-danger"></i>
              </button>
              </Link>
              <img src={product2} className="card-img-top p-3" alt="Chocolate" style={{height: '240px', objectFit: 'contain'}} />
              <Link to="/ProductDetails" style={{ textDecoration: "none", color: "inherit" }}>

              <div className="card-body pb-0">
                <p className="text-muted mb-1">Chair</p>
                
                <h5 className="card-title">Club Chair</h5>
                
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
                  <span className="text fw-bold">₹1420.50</span>
                  <small className="text-muted ms-2 text-decoration-line-through">₹1500.00</small>
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
           */}
          {/* <div className="col">
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
          </div> */}
          
          {/* <div className="col">
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
          </div> */}
          
          {/* <div className="col">
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
          </div> */}

          {/* <div className="col">
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
          </div> */}

          {/* <div className="col">
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
          </div> */}


          {/* <div className="col">
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
          </div> */}

          {/* <div className="col">
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

          </div> */}
         <br/>
          <div className="container-fluid p-0 w-100 mt-5 pt-5">
<br/>
          <section>
      <div className="container mt-5">
        <div className="text-center mb-2">
          <h1 className="mb-0">Best Selling</h1>
          <img src={underline} alt="" style={{ height: '5px' }} />
        </div>

        <div className="slide-container swiper pt-5">
          <div className="slide-content">
            <div className="card-wrapper swiper-wrapper">
              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling1} className="img-fluid" alt="Gray lamp" />
                  <div className="icons">
                  <Link to="/ProductDetails" style={{ textDecoration: "none", color: "inherit" }}>
                      <i className="bi bi-plus-lg mx-1" style={{ cursor: "pointer" }}></i>
                    </Link>                 
                    <Link to="/Cart" style={{ textDecoration: "none", color: "inherit" }}>
                            <i className="bi bi-bag-check mx-1" style={{ cursor: "pointer" }}></i>
                          </Link>

                          <Link to="/Wishlist" style={{ textDecoration: "none", color: "inherit" }}>
                            <i className="bi bi-heart mx-1" style={{ cursor: "pointer" }}></i>
                          </Link>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Gray lamp</b></p>
                  <p>₹2700.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling2} className="img-fluid" alt="Simple chair" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Simple chair</b></p>
                  <p>₹1900.00 - $17.10</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling3} className="img-fluid" alt="Teapot with black tea" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Teapot with black tea</b></p>
                  <p>₹500.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling4} className="img-fluid" alt="Wooden Flowerpot" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Wooden Flowerpot</b></p>
                  <p>₹700.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling5} className="img-fluid" alt="Wooden Cup" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Wooden Cup</b></p>
                  <p>₹1000.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling6} className="img-fluid" alt="Mug" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Mug</b></p>
                  <p>₹300.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling7} className="img-fluid" alt="Bottel" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Bottel</b></p>
                  <p>₹2500.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling8} className="img-fluid" alt="Smooth Disk" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Smooth Disk</b></p>
                  <p>₹1700.00</p>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="image-content position-relative best-selling">
                  <img src={selling9} className="img-fluid" alt="Wooden Flowerpot" />
                  <div className="icons">
                    <i className="bi bi-plus-lg mx-1"></i>
                    <i className="bi bi-bag-check mx-1"></i>
                    <i className="bi bi-heart mx-1"></i>
                  </div>
                </div>
                <div className="card-content">
                  <p><b>Wooden Flowerpot</b></p>
                  <p>₹1500.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-button-next swiper-navBtn"></div>
          <div className="swiper-button-prev swiper-navBtn"></div>
        </div>
      </div>
    </section>
    </div>
   
     
        </div>
        
                    
                           
        
  
                                
      
      
      <div className="container-fluid p-0 w-100 mt-5 pt-5">

<section style={{ backgroundColor: '#f4f5f7' }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div>
            <h1><strong>Deco Collection <span style={{ color: 'red' }}>50% OFF</span></strong></h1>
            <img src="assetss/underline.jpg.png" alt="" style={{ height: '4px' }} />
            <p>The standart chunk of lorem ipsum used since the 1500s is reproduced for those. Sections
              1.10.32 and 1.10.33 from â€œde Finibus Bonorum et Malorum</p>
            <div className="timer text-center section-space--mt_60">
              <div data-countdown="2024/12/12" id="demo" className="d-flex gap-lg-4 gap-2">
                <div className="single-countdown">
                  <h1 id="days"></h1>
                  <p>DAYS</p>
                </div>
                <div className="single-countdown">
                  <h1>:</h1>
                </div>
                <div className="single-countdown">
                  <h1 id="hours"></h1>
                  <p>HOURS</p>
                </div>
                <div className="single-countdown">
                  <h1>:</h1>
                </div>
                <div className="single-countdown">
                  <h1 id="min"></h1>
                  <p>MINTS</p>
                </div>
                <div className="single-countdown">
                  <h1>:</h1>
                </div>
                <div className="single-countdown">
                  <h1 id="sec"></h1>
                  <p>SECS</p>
                </div>
              </div>
            </div>
            <button className="btn light-brown-btn">Shop Now &nbsp;<i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <img src={img1} alt="..." className="img-fluid px-lg-5 img-zoom" />
        </div>
      </div>
    </div>
  </section>
</div>
<div className="container-fluid p-0 w-100 mt-5 pt-5">

<section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img src={img2} alt="..." className="img-fluid img-zoom" />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <p style={{ color: '#999' }}><b>FEATURED PRODUCT</b></p>
              <h1 className="mb-0"><strong>Table Wood Pine</strong></h1>
              <img src={underline} alt="" style={{ height: '4px' }} />
              <p className="py-4">Excepteur sint occaecat cupidatat non proident, sunt in culpaqui
                officia deserunt mollit anim id est laborum
              </p>
              <a 
      className="fbtn mt-5 light-brown-btn rounded-pill" 
      href="#" 
      style={{ 
        fontWeight: 600,
        padding: '10px 25px',
        display: 'inline-block',
        textDecoration: 'none'
      }}
    >
      Only ₹1700 &nbsp;<i className="bi bi-arrow-right"></i>
    </a>            </div>
          </div>
        </div>
      </div>
      
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div>
              <p style={{ color: '#999' }}><b>FEATURED PRODUCT</b></p>
              <h1 className="mb-0"><strong>Slipper Chair</strong></h1>
              <img src={underline} alt="" style={{ height: '4px' }} />
              <p className="my-4">When an unknown printer took a gallary of type and scranbled it to make a type
                specimen book. Excepteur sint occaecat cupidatad non proident, sunt in culpa qui officia.</p>
                <a 
      className="fbtn mt-5 light-brown-btn rounded-pill" 
      href="#" 
      style={{ 
        fontWeight: 600,
        padding: '10px 25px',
        display: 'inline-block',
        textDecoration: 'none'
      }}
    >
      Only ₹2700 &nbsp;<i className="bi bi-arrow-right"></i>
    </a>            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img 
              src={img1} 
              alt="..." 
              style={{ maxHeight: '20rem' }} 
              className="img-fluid px-lg-5 img-zoom" 
            />
          </div>
        </div>
      </div>
      
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 d-flex justify-content-center">
            <img 
              src={img3}
              alt="..." 
              style={{ maxWidth: '28rem' }} 
              className="img-fluid px-lg-5 img-zoom" 
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <p style={{ color: '#999' }}><b>FEATURED PRODUCT</b></p>
              <h1 className="mb-0"><strong>Art Deco Home</strong></h1>
              <img src={underline} alt="" style={{ height: '4px' }} />
              <p className="my-4">Many desktop publishing packages and web page editors now use lorem ipsum as
                their default model text, and a search for.</p>
                <a 
      className="fbtn mt-5 light-brown-btn rounded-pill" 
      href="#" 
      style={{ 
        fontWeight: 600,
        padding: '10px 25px',
        display: 'inline-block',
        textDecoration: 'none'
      }}
    >
      Only ₹570 &nbsp;<i className="bi bi-arrow-right"></i>
    </a>            </div>
          </div>
        </div>
      </div>
    </section>
</div>

    </div>
    
    
  );
}

export default Home;