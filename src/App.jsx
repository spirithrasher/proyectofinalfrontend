import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import NavbarSection from './components/NavbarSection';
import Header from './components/Header';
import ProductsSection from './components/ProductsSection';
import CartModal from './components/CartModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);

  return (
    <>

      <NavbarSection openCart={openCart} openLogin={openLogin} openRegister={openRegister}/>
      <LoginModal show={showLogin} handleClose={closeLogin} />
      <RegisterModal show={showRegister} handleClose={closeRegister} />
      <Header />
      <ProductsSection />
      <ContactSection />
      <CartModal show={showCart} onHide={closeCart} />
      <Footer />
      
    </>
  );
}

export default App;