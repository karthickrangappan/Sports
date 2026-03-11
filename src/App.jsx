import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/Admin/AddProduct';
import RemoveProducts from './pages/Admin/RemoveProduct';
import ScrollToTop from './components/ScrollToTop';
import Private from "./Auth/Private"
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Shipping from './pages/Admin/Shipping';
import Inventory from './pages/Admin/Inventory';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Private><Cart /></Private>} />
            <Route path="/wishlist" element={<Private><Wishlist /></Private>} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/remove-product" element={<RemoveProducts />} />
            <Route path="/admin/shipping" element={<Shipping />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/checkout" element={<Private><Checkout /></Private>} />
            <Route path="/orders" element={<Private><Orders /></Private>} />
            <Route path="/profile" element={<Private><Profile /></Private>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
