import React, { createContext, useState, useContext, useEffect } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  
  const cleanProduct = (product) => {
    // Filtramos las propiedades relevantes
    const { id, name, price, image } = product;

    // Retornamos un objeto limpio con solo las propiedades necesarias
    return { id, name, price, image };
  };
  
  const addToCart = (product) => {
   
    const cleanedProduct = cleanProduct(product);

    setCartItems((prev) => {
      const updatedCart = [...prev];

      // Buscar si el producto ya existe en el carrito
      const existingProduct = updatedCart.find(item => item.id === cleanedProduct.id);

      if (existingProduct) {
        existingProduct.quantity += 1;  // Aumentar la cantidad si ya existe
      } else {
        updatedCart.push({ ...cleanedProduct, quantity: 1 });  // Agregar el producto con cantidad 1
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

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
