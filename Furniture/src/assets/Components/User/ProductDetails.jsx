import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



//import img1 from '../../images/cart1.png';
// import product1 from '../../images/cart1.png';
//import product2 from '../../images/cart2.png';
// import product3 from '../../images/product-6.jpg';
// import product4 from '../../images/img1.jpg';
// import product5 from '../../images/product-2.jpeg';
// import product6 from '../../images/product-8.jpg';
// import product7 from '../../images/product4.png';
// import product8 from '../../images/product-5.jpeg';
import { Link } from "react-router-dom"


function ProductDetails() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);  // Store reviews
  const [error, setError] = useState('');  // Error state
  const [canAddReview, setCanAddReview] = useState(false); // New state to track review eligibility


  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  const userId = user?.id;

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

        //Pagination

        //fetch below products
        const [currentPage] = useState(1);
        const itemsPerPage = 8;

          // 🟡 Calculate current products to display
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
         // const totalPages = Math.ceil(products.length / itemsPerPage);

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

        useEffect(() => {
          window.scrollTo(0, 0);
        }, [currentPage]);

        
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
  
        useEffect(() => {
          const fetchReviews = async () => {
            try {
              console.log("Fetching reviews for product ID:", id);  // 👈 Check in console
              const response = await axios.get(`http://localhost:5000/api/Review/view-reviews`);
              
              // 🔍 Frontend filtering by product ID
              const filtered = response.data.filter((review) => review.product._id === id);
        
              console.log("Filtered reviews:", filtered);  // ✅ Confirm what's showing
              setReviews(filtered);
              setLoading(false);
            } catch (err) {
              console.error("Error fetching reviews:", err.response?.data || err.message);
              setError('Error fetching reviews');
              setLoading(false);
            }
          };
        
          if (id) {
            fetchReviews();
          }
        }, [id]);
        
          // Check if the product is in the user's orders
          useEffect(() => {
            const checkProductInOrders = async () => {
              try {
                const response = await axios.get("http://localhost:5000/api/Order/view-order");
                console.log("Orders fetched: ", response.data);
                
                const orders = response.data;
          
                const userOrders = orders.filter(
                  (order) => order.userId && String(order.userId._id) === String(userId)
                );
          
                console.log("Filtered orders for current user: ", userOrders);
          
                const productInOrder = userOrders.some((order) =>
                  order.products.some((product) => String(product.productId._id) === String(id))
                );
          
                console.log("Is product in user's orders: ", productInOrder);
          
                setCanAddReview(productInOrder);
              } catch (err) {
                console.error("Error checking orders:", err);
              }
            };
          
            if (userId) {
              checkProductInOrders();
            }
          }, [userId, id]);
          

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
          <h4>₹{product.costPrice}</h4>

          {/* Quantity */}
          <p className="mb-1">Quantity</p>
          <div className="btn-group mb-3">
            <button className="btn btn-outline-dark" onClick={decreaseQuantity}>-</button>
            <button className="btn btn-outline-dark">{quantity}</button>
            <button className="btn btn-outline-dark" onClick={increaseQuantity}>+</button>
            <button className="btn custom-btn ms-3" onClick={() => addToCart(product._id, product.costPrice, product.productImage)} 
            >Add to cart</button>
          </div>
        </div>
      </div>
      

      {/* Customer Reviews */}
      <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mt-5">Customer Reviews</h4>
        {canAddReview && (
  <Link to={`/Review/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <button className="btn light-brown-btn">Add Review</button>
  </Link>
)}

      </div>

      <p className="text-muted">You need to order first to give a review on this product!</p>

              <div className="container pt-3">
          {loading ? (
            <div>Loading reviews...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : reviews.length === 0 ? (
            <div>No reviews for this product yet.</div>
          ) : (
            <div className="row">
              {reviews.map((review) => (
                <div key={review._id} className="col-md-4">
                  <div className="card p-3 mb-3">
                  <h6>
                    {review.user?.fullname} {review.user?.lastName}{" "}
                    {"⭐".repeat(parseInt(review.rating))}
                  </h6>


            <p>{review.review}</p>
            <small className="text-muted">
              Published on{" "}
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </small>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>


      {/* More Products Section */}
      <h4 className="mt-5">More from UrbanWood</h4>
      <div className="container my-5">
               
                <div className="row row-cols-1 row-cols-sm-2 mt-5 row-cols-md-4 g-4">
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
               
                                 </div>
                               </Link>
                             </div>
                           </div>
                         ))
                       )}
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
