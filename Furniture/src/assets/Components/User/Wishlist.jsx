import React, { useState, useEffect } from 'react';
import axios from 'axios';
import contactimg from '../../images/contact.jpg';

function Wishlist() {
  // Button styles
 

  const deleteButtonStyle = {
    backgroundColor: '#DC3545',
    borderColor: '#DC3545',
    color: 'white'
  };

  const moveAllButtonStyle = {
    color: '#CD853F',
    borderColor: '#CD853F',
    backgroundColor: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    marginTop: '20px',
    display: 'inline-block',
    float: 'right'
  };

 
  
  const productCellStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 10px'
  };

  const productImageStyle = {
    maxWidth: '70px',
    marginRight: '15px',
  };

  const [wishlistItems, setWishlistItems] = useState([]);
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

useEffect(() => {
  const fetchWishlistItems = async () => {
    if (!userId) {
      console.warn("User ID not found. Cannot load wishlist.");
      return;
    }

    const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

    if (savedWishlist.length === 0) {
      console.log("No wishlist found for this user.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/Product/view-product");
      const allProducts = response.data;

      const filtered = allProducts.filter(product => savedWishlist.includes(product._id));
      setWishlistItems(filtered);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  fetchWishlistItems();
}, [userId]);

const handleDelete = (productId) => {
  const updatedWishlist = wishlistItems.filter((item) => item._id !== productId);
  setWishlistItems(updatedWishlist);

  const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
  const newWishlist = savedWishlist.filter((id) => id !== productId);
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(newWishlist));
};

const handleAddToCart = async (product) => {
  try {
    await axios.post("http://localhost:5000/api/Cart/add", {
      userId,
      productId: product._id,
      quantity: 1,
      productImage: product.productImage,
      costPrice: product.costPrice,
    });
    alert("Item moved to cart!");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Failed to add item to cart.");
  }
};


  return (
    <div style={{ backgroundColor: "#FAFDFF"}}>

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
                              <h1 className="text-white text-center mb-2">Wishlist</h1>
                              <p className="text-white text-center">Add your Fovorite Items</p>
                            </div>
                          </div>
                    
                </div>
                <div className="container py-4">

      {/* Breadcrumb */}
      {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent p-0">
          <li className="breadcrumb-item"><a href="#" style={{color: '#6c757d', textDecoration: 'none'}}>Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
        </ol>
      </nav> */}
      
      {/* Wishlist Table */}
      <div className="table-responsive mt-5 pt-5">
        <table className="table">
          <thead style={{backgroundColor: '#f8f9fa'}}>
            <tr>
              <th style={{padding: '15px 10px', fontWeight: '600'}}>Product</th>
              <th style={{padding: '15px 10px', fontWeight: '600'}}>Price</th>
              <th className="ps-5" style={{ padding: '15px 10px', fontWeight: '600' }}>Actions</th>
              </tr>
          </thead>
          <tbody>
          {wishlistItems.length === 0 ? (
    <tr>
      <td colSpan="3" className="text-center py-5">No items in your wishlist.</td>
    </tr>
  ) : (
    wishlistItems.map((item) => (
            <tr key={item._id} style={{borderBottom: '1px solid #dee2e6'}}>
              <td style={productCellStyle}>
              <img src={item.productImage ? `http://127.0.0.1:5000/public/uploads/${item.productImage}` : "https://via.placeholder.com/50"}  style={productImageStyle}  />
              <span>{item.name}</span>
              </td>
              <td style={{verticalAlign: 'middle'}}>₹{item.costPrice}</td>
              <td style={{verticalAlign: 'middle'}}>
                <button className="btn ms-4 me-2 light-brown-btn" onClick={() => handleAddToCart(item)}>Add to cart</button>
                <button className="btn" style={deleteButtonStyle}  onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
           
          ))
        )}
          </tbody>
        </table>
      </div>
      
      {/* Move All to Cart Button */}
      <div className="text-right">
        <button className="btn" style={moveAllButtonStyle}>Move all to cart</button>
      </div>
    </div>
    </div>
  );
}

export default Wishlist;