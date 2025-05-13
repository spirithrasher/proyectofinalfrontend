import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Componente que proporciona el contexto a la aplicación
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar el carrito desde localStorage cuando la app se monta
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const existingProduct = updatedCart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1; // Aumentar la cantidad si ya existe
      } else {
        updatedCart.push({ ...product, quantity: 1 }); // Si no existe, agregarlo con cantidad 1
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter(item => item.id !== productId);
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart'); // Eliminar carrito de localStorage
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook para usar el contexto de manera más fácil
export const useCart = () => useContext(CartContext);
