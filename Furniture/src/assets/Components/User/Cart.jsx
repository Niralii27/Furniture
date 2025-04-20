import React, { useEffect, useState } from "react";
import axios from "axios";
//import cart1 from '../../images/cart1.png';
//import cart2 from '../../images/cart2.png';
import contactimg from '../../images/contact.jpg';
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";





function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const navigate = useNavigate();


        // Button styles
        const buttonStyle = {
          border: '1px solid #d2b48c', // Light brown border
          backgroundColor: 'white',
          color: '#333',
          transition: 'all 0.3s ease'
        };

        const fetchCart = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/Cart/user/${userId}`);
            setCartItems(res.data);
          } catch (err) {
            console.error("Error fetching cart:", err);
          }
        };
      
        // ✅ useEffect to load cart on component mount
        useEffect(() => {
          if (userId) {
            fetchCart();
          }
        }, [userId]);
      
        // ✅ Remove item from cart
        const removeItem = async (id) => {
          try {
            await axios.delete(`http://localhost:5000/api/Cart/remove/${id}`);
            fetchCart(); // Refresh cart after removal
          } catch (err) {
            console.error("Error removing item:", err);
          }
        };
      
  

  const increaseQuantity = async (itemId) => {
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    // Optionally, call backend to update quantity
  };

  const decreaseQuantity = async (itemId) => {
    const updatedCart = cartItems.map(item =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    // Optionally, call backend to update quantity
  };

  const calculateTotal = (costPrice, quantity) => {
    return (costPrice * quantity).toFixed(2);
  };


  //checkout page

  const handleCheckout = () => {
    // Save cart items to localStorage
    localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
    // Redirect to checkout page
    window.location.href = '/Checkout'; // or use navigate('/Checkout') if using React Router
  };
  
  //Offer Code

  const [couponCode, setCouponCode] = useState("");
const [discountAmount, setDiscountAmount] = useState(0);
const [discountedTotal, setDiscountedTotal] = useState(null);
const applyCoupon = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/Offer/view-offers");
    const today = new Date();

    // Calculate current cart total
    const subtotal = cartItems.reduce((acc, item) => {
      return acc + (item.productId?.costPrice || 0) * item.quantity;
    }, 0);

    // Find a valid offer
    const offer = data.find((offer) =>
      offer.offerCode?.toLowerCase() === couponCode.toLowerCase() &&
      new Date(offer.startDate) <= today &&
      today <= new Date(offer.endDate) &&
      subtotal >= offer.minDiscountAmount &&
      subtotal <= offer.maxDiscountAmount
    );

    if (offer) {
      const discount = (offer.discount / 100) * subtotal;
      setDiscountAmount(discount);
      setDiscountedTotal(subtotal - discount);
      Swal.fire("Success", `Coupon applied! You saved ₹${discount.toFixed(2)}`, "success");
    } else {
      setDiscountAmount(0);
      setDiscountedTotal(null);
      Swal.fire("Invalid", "Coupon is not valid or conditions not met", "error");
    }
  } catch (error) {
    console.error("Error applying coupon:", error);
    Swal.fire("Error", "Something went wrong while applying coupon", "error");
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
                      <h1 className="text-white text-center mb-2">Cart</h1>
                      <p className="text-white text-center">Add your product In it</p>
                    </div>
                  </div>
            
        </div>
    <div className="container py-4 mt-5 pt-5">
      <style>
        {`
          .cart-btn:hover {
            background-color: #a67c52 !important; 
            color: white !important;
          }
        `}
      </style>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="border-bottom">
                  <th className="text-left">Image</th>
                  <th className="text-left">Product</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">Remove</th>
                </tr>
              </thead>
              <tbody>
              {cartItems.length === 0 ? (
            <tr><td colSpan="4">Cart is empty</td></tr>
          ) : (
            cartItems.map((item) => (
                <tr className="border-bottom">
                  <td>
                    <img src={item.productImage ? `http://127.0.0.1:5000/public/uploads/${item.productImage}` : "https://via.placeholder.com/50"} 
 alt="Product 1" className="img-fluid" style={{maxWidth: '100px'}} />
                  </td>
                  <td className="align-middle">{item.productId?.name}</td>
                  <td className="align-middle">₹{item.productId?.costPrice}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm cart-btn"
                        style={buttonStyle}
                        onClick={() => decreaseQuantity(item._id)}
                        >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control mx-2 text-center" 
                        value={item.quantity}
                        readOnly 
                        style={{width: '50px', border: '1px solid #d2b48c'}}
                      />
                      <button 
                        className="btn btn-sm cart-btn"
                        style={buttonStyle}
                        onClick={() => increaseQuantity(item._id)}
                        >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="align-middle text-right">₹{calculateTotal(item.productId?.costPrice || 0, item.quantity)}</td>
                  <td className="align-middle text-right">
                    <button className="btn btn-link cart-btn" style={buttonStyle} onClick={() => removeItem(item._id)}>x</button>
                  </td>
                </tr>
             ))
            )}
              </tbody>
            </table>
          </div>
  
          <div className="d-flex justify-content-between mt-4">
            <div>
              {/* <button 
                className="btn rounded-pill px-4 py-2 cart-btn" 
                style={{...buttonStyle, backgroundColor: '#ffffff', color: '#CD853F'}}
              >
                Update Cart
              </button> */}
            </div>
            <div>
            <button 
  className="btn rounded-pill px-4 py-2 cart-btn"
  style={{...buttonStyle, backgroundColor: '#ffffff', color: '#CD853F'}}
  onClick={() => navigate("/Shop")}
>
  Continue Shopping
</button>

            </div>
          </div>
  
          <div className="row mt-5">
            <div className="col-md-6">
              <h4>Coupon</h4>
              <p>Enter your coupon code if you have one.</p>
              <div className="input-group mb-3">
              <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Coupon Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{border: '1px solid #d2b48c'}}
                />

                <div className="input-group-append">
                <button 
  className="btn rounded-right px-4 cart-btn" 
  type="button"
  onClick={applyCoupon}
  style={{...buttonStyle, backgroundColor: '#D2B48C', color: 'white'}}
>
  Apply Coupon
</button>

                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
              
                  <h4 className="card-title">CART TOTALS</h4>
                  <div className="mt-4">
  {cartItems.length === 0 ? (
    <p>Cart is empty</p>
  ) : (
    <>
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal</span>
        <span>₹
          {cartItems.reduce((acc, item) => {
            return acc + (item.productId?.costPrice || 0) * item.quantity;
          }, 0).toFixed(2)}
        </span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Discount</span>
        <span>- ₹{discountAmount.toFixed(2)}</span>
      </div>
    </>
  )}
</div>

<hr />

              <div className="d-flex justify-content-between">
                <span>Total</span>
                <span>
                  ₹{discountedTotal !== null
                    ? discountedTotal.toFixed(2)
                    : cartItems.reduce((acc, item) => {
                        return acc + (item.productId?.costPrice || 0) * item.quantity;
                      }, 0).toFixed(2)
                  }
                </span>
              </div>


                  <div className="d-grid gap-2 mt-4">
                    <Link to="/Checkout" style={{ textDecoration: "none", color: "inherit" }}>
                    <button 
                              className="btn btn-block rounded-pill py-3 cart-btn"
                              style={{ ...buttonStyle, backgroundColor: '#ffffff', color: '#CD853F' }}
                              onClick={handleCheckout}
                            >
                              Proceed To Checkout
                            </button>


                    </Link>
                  </div>
               
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Cart;