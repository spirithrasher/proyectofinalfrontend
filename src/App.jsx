import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarSection from './components/NavbarSection';
import Header from './components/Header';
import ProductsSection from './components/ProductsSection';
import CartModal from './components/CartModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [showCart, setShowCart] = useState(false);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  return (
    <>

     <NavbarSection openCart={openCart} />
    <Header />
    <ProductsSection />
    <ContactSection />
    <CartModal show={showCart} onHide={closeCart} />
    <Footer />
    </>
  );
}

export default App;