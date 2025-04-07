import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './assets/Components/User/Home'
import Navbar from './assets/Components/User/Navbar'
import Shop from './assets/Components/User/Shop'
import ContactUs from './assets/Components/User/ContactUs'
import About from './assets/Components/User/About'
import Cart from './assets/Components/User/Cart'
import Wishlist from './assets/Components/User/Wishlist'
import Account from './assets/Components/User/Account'
import Orders from './assets/Components/User/Orders'
import OrderDetails from './assets/Components/User/OrdersDetails'
import ProductDetails from './assets/Components/User/ProductDetails'
import Footer from './assets/Components/User/Footer'
import Checkout from './assets/Components/User/Checkout'
import Address from './assets/Components/User/Address'
import Login from './assets/Components/User/Login'
import Review from './assets/Components/User/Review'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Router>
    <Navbar></Navbar>
    <br></br>
    <Routes>
      <Route exact path="/Home" element={<Home />} />
      <Route exact path="/Shop" element={<Shop />} />
      <Route exact path="/ContactUs" element={<ContactUs />} />
      <Route exact path="/About" element={<About />} />
      <Route exact path="/Cart" element={<Cart />} />
      <Route exact path="/Wishlist" element={<Wishlist />} />
      <Route exact path="/Account" element={<Account />} />
      <Route exact path="/Orders" element={<Orders />} />
      <Route exact path="/OrderDetails" element={<OrderDetails />} />
      <Route exact path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route exact path="/Checkout" element={<Checkout />} />
      <Route exact path="/Address" element={<Address />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/Review" element={<Review />} />

    </Routes>
    <br></br>
    <Footer></Footer>
   </Router>
    </>
  )
}

export default App
