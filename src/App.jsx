import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { Routes, Route } from 'react-router-dom';
import NavbarSection from './components/NavbarSection';
import Header from './components/Header';
import ProductsSection from './components/ProductsSection';
import CartModal from './components/CartModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ScrollToHash from './components/ScrollToHash';

import Perfil from './pages/Perfil';
import Ventas from './pages/Ventas';
import Pedidos from './pages/Pedidos';
import SubirProducto from './pages/SubirProducto';

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
      <div className="d-flex flex-column min-vh-100">
        <NavbarSection openCart={openCart} openLogin={openLogin} openRegister={openRegister}/>
        <LoginModal show={showLogin} handleClose={closeLogin} />
        <RegisterModal show={showRegister} handleClose={closeRegister} />
        <ScrollToHash />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <ProductsSection />
                <ContactSection />
              </>
            }
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/subir-producto" element={<SubirProducto />} />
        </Routes>
        <CartModal show={showCart} onHide={closeCart} />
        <Footer />
      </div>
    </>
  );
}

export default App;