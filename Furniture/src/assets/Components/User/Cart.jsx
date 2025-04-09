import React, { useState } from 'react';
import cart1 from '../../images/cart1.png';
import cart2 from '../../images/cart2.png';
import contactimg from '../../images/contact.jpg';
import { Link } from "react-router-dom"



function Cart() {
  const [product1Quantity, setProduct1Quantity] = useState(3);
  const [product2Quantity, setProduct2Quantity] = useState(1);

  // Button styles
  const buttonStyle = {
    border: '1px solid #d2b48c', // Light brown border
    backgroundColor: 'white',
    color: '#333',
    transition: 'all 0.3s ease'
  };

  // Button hover style will be handled with inline CSS class

  const increaseQuantity = (product) => {
    if (product === 1) {
      setProduct1Quantity(product1Quantity + 1);
    } else {
      setProduct2Quantity(product2Quantity + 1);
    }
  };

  const decreaseQuantity = (product) => {
    if (product === 1 && product1Quantity > 1) {
      setProduct1Quantity(product1Quantity - 1);
    } else if (product === 2 && product2Quantity > 1) {
      setProduct2Quantity(product2Quantity - 1);
    }
  };

  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
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
                <tr className="border-bottom">
                  <td>
                    <img src={cart1} alt="Product 1" className="img-fluid" style={{maxWidth: '100px'}} />
                  </td>
                  <td className="align-middle">Product 1</td>
                  <td className="align-middle">₹1080.00</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm cart-btn"
                        style={buttonStyle}
                        onClick={() => decreaseQuantity(1)}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control mx-2 text-center" 
                        value={product1Quantity} 
                        readOnly 
                        style={{width: '50px', border: '1px solid #d2b48c'}}
                      />
                      <button 
                        className="btn btn-sm cart-btn"
                        style={buttonStyle}
                        onClick={() => increaseQuantity(1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="align-middle text-right">₹{calculateTotal(1080.00, product1Quantity)}</td>
                  <td className="align-middle text-right">
                    <button className="btn btn-link cart-btn" style={buttonStyle}>x</button>
                  </td>
                </tr>
                <tr className="border-bottom">
                  <td>
                    <img src={cart2} alt="Product 2" className="img-fluid" style={{maxWidth: '100px'}} />
                  </td>
                  <td className="align-middle">Product 2</td>
                  <td className="align-middle">₹4900.00</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm cart-btn"
                        style={buttonStyle}
                        onClick={() => decreaseQuantity(2)}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control mx-2 text-center" 
                        value={product2Quantity} 
                        readOnly 
                        style={{width: '50px', border: '1px solid #d2b48c'}}
                      />
                      <button 
                        className="btn btn-sm cart-btn"
                        style={buttonStyle}
                        onClick={() => increaseQuantity(2)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="align-middle text-right">₹{calculateTotal(4900.00, product2Quantity)}</td>
                  <td className="align-middle text-right">
                    <button className="btn btn-link cart-btn" style={buttonStyle}>x</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div className="d-flex justify-content-between mt-4">
            <div>
              <button 
                className="btn rounded-pill px-4 py-2 cart-btn" 
                style={{...buttonStyle, backgroundColor: '#ffffff', color: '#CD853F'}}
              >
                Update Cart
              </button>
            </div>
            <div>
              <button 
                className="btn rounded-pill px-4 py-2 cart-btn"
                style={{...buttonStyle, backgroundColor: '#ffffff', color: '#CD853F'}}
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
                  style={{border: '1px solid #d2b48c'}}
                />
                <div className="input-group-append">
                  <button 
                    className="btn rounded-right px-4 cart-btn" 
                    type="button"
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
                  <div className="d-flex justify-content-between mt-4">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal(1080.00, product1Quantity + product2Quantity)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Total</span>
                    <span>₹{calculateTotal(2780.00, product1Quantity + product2Quantity)}</span>
                  </div>
                  <div className="d-grid gap-2 mt-4">
                    <Link to="/Checkout" style={{ textDecoration: "none", color: "inherit" }}>
                    <button 
                      className="btn btn-block rounded-pill py-3 cart-btn"
                      style={{...buttonStyle, backgroundColor: '#ffffff', color: '#CD853F'}}
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