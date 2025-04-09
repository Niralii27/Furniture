import React, { useState } from 'react';
import '../../css/checkout.css'; 
import { Link } from "react-router-dom";
import cart1 from '../../images/cart1.png';
import cart2 from '../../images/cart2.png';

function Checkout() {
  // State to track selected payment method
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // State to track validation error
  const [paymentError, setPaymentError] = useState('');
  
  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentError('');
  };
  
  // Handle place order button click
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      setPaymentError('Please select a payment method');
      return;
    }
    
    // Process the order here
    console.log('Order placed with payment method:', paymentMethod);
    alert('Order placed successfully!');
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6">
          <h4>Select Shipping Address</h4>
          
          <div className="address-box">
            <p className="mb-1">Nirali Akbari,</p>
            <p className="mb-1">8849274162,</p>
            <p className="mb-1">BackBone park-9,301,Shyam Apartment,</p>
            <p className="mb-1">Rajkot,</p>
            <p className="mb-0">Select State - 360002</p>
          </div>
          
          <Link to="/Address" style={{ textDecoration: "none", color: "inherit" }}>
            <button className="btn light-brown-btn mb-4">Add New Address</button>
          </Link>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <img src={cart1} alt="Chocolate" className="product-img me-3" />
                  <span>Chocolate x 1</span>
                </div>
                <span>₹42.50</span>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <img src={cart2} alt="Ladies Fingers" className="product-img me-3" />
                  <span>Ladies Fingers (Loose), 1 kg x 1</span>
                </div>
                <span>₹10.40</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹52.90</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>₹50.00</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>₹102.9</strong>
              </div>
              
              <div className={`mb-3 ${paymentError ? 'payment-error' : ''}`}>
                <p>Payment Mode:<span className="text-danger">*</span></p>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="paymentMethod" 
                    id="cashOnDelivery" 
                    value="cashOnDelivery"
                    onChange={handlePaymentChange} 
                    checked={paymentMethod === 'cashOnDelivery'}
                  />
                  <label className="form-check-label" htmlFor="cashOnDelivery">
                    Cash On Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="paymentMethod" 
                    id="online" 
                    value="online"
                    onChange={handlePaymentChange}
                    checked={paymentMethod === 'online'}
                  />
                  <label className="form-check-label" htmlFor="online">
                    Online
                  </label>
                </div>
                {paymentError && (
                  <div className="text-danger mt-2 small">
                    {paymentError}
                  </div>
                )}
              </div>
              
              <button 
                className="btn light-brown-btn w-100"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;