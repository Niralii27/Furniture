import React, { useEffect, useState } from 'react';
import '../../css/checkout.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';



function Checkout() {

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [addressError, setAddressError] = useState('');
  const navigate = useNavigate();
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);



//Address

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const filteredAddresses = allAddresses.filter(addr => addr.userId === user?.id);
    setUserAddresses(filteredAddresses);
    
  }, []);

  
  const handleDelete = (id) => {
    const updatedAddresses = userAddresses.filter((addr) => addr.id !== id);
    setUserAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };
  
  const handleSelectAddress = (addressId) => {
    // Toggle selected address
    if (selectedAddress === addressId) {
      setSelectedAddress(null); // Deselect if clicked again
    } else {
      setSelectedAddress(addressId);
    }
  };
  // Fetch cart items from localStorage instead of DB
  useEffect(() => {
    const storedCart = localStorage.getItem('checkoutCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  
   
    }, []);
 

  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.costPrice * item.quantity), 0).toFixed(2);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentError('');
  };

  const handlePlaceOrder = async () => {

    if (!selectedAddress) {
      setAddressError("Please select a shipping address.");
      return;
    }
    setAddressError("");

    if (!paymentMethod) {
      setPaymentError("Please select a payment method.");
      return;
    }
  
    try {
      // Show centered thank you popup with emoji 🎉
      await Swal.fire({
        title: '🎉 Thank You!',
        text: 'Your order has been placed successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#CD853F',
      });
  
      // Navigate after confirmation
      navigate('/Shop', { state: { cartItems } });
  
      // Clear the cart
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(`http://localhost:5000/api/Cart/remove/${item._id}`)
        )
      );
      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong!");
    }
  };
  
  //Address
  

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
      <div className="col-md-6">
              <h4>Select Shipping Address</h4>
          {addressError && <div className="text-danger mb-3">{addressError}</div>}

              {userAddresses.length > 0 ? (
                userAddresses.map((address, index) => (
                  <div key={index} className={`address-box mb-3 ${selectedAddress === address.id ? 'border border-primary' : ''}`} onClick={() => handleSelectAddress(address.id)}>
                  <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">{address.firstName} {address.lastName},</p>
                  <p className="mb-1">{address.phone},</p>
                  <p className="mb-1">{address.streetAddress}{address.apartment ? `, ${address.apartment}` : ''},</p>
                  <p className="mb-1">{address.city},</p>
                  <p className="mb-0">{address.state} - {address.pinCode}</p>
                </div>
                
                <button className="btn btn-danger mt-2" onClick={() => handleDelete(address.id)}>
                  Delete
                </button>
              </div>
                      </div>
                ))
              ) : (
                <p>No saved addresses found.</p>
              )}

              <Link to="/Address" style={{ textDecoration: "none", color: "inherit" }}>
                <button className="btn light-brown-btn mb-4">Add New Address</button>
              </Link>
            </div>



        <div className="col-md-6">
          <div className="card">
            <div className="card-body">

              {cartItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <img src={item.productImage ? `http://127.0.0.1:5000/public/uploads/${item.productImage}` : "https://via.placeholder.com/50"}  alt={item.productId?.name} className="product-img me-3" />
                    <span>{item.productId?.name} x {item.quantity}</span>
                  </div>
                  <span>₹{(item.costPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>₹50.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>₹{(parseFloat(calculateTotal()) + 50).toFixed(2)}</strong>
              </div>

              <div className={`mb-3 ${paymentError ? 'payment-error' : ''}`}>
                <p>Payment Mode:<span className="text-danger">*</span></p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cashOnDelivery"
                    onChange={handlePaymentChange} checked={paymentMethod === 'cashOnDelivery'} />
                  <label className="form-check-label" htmlFor="cod">Cash On Delivery</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="online" value="online"
                    onChange={handlePaymentChange} checked={paymentMethod === 'online'} />
                  <label className="form-check-label" htmlFor="online">Online</label>
                </div>
                {paymentError && <div className="text-danger mt-2">{paymentError}</div>}
              </div>

              <button className="btn light-brown-btn w-100" onClick={handlePlaceOrder}>
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
