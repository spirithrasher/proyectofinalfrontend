// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import { API_URL } from '../utils/apiConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // console.log(res.ok)
      const data = await res.json();
     
      if (res.ok) {
        // console.log(data['user_login']['token'])
        const userlogin = { id: data['user_login']['user']['id'], email,name: data['user_login']['user']['name'], token: data['user_login']['token']  }
        setUser(userlogin);
        localStorage.setItem("user", JSON.stringify(userlogin));
      } else {
        throw new Error(data.message || "Login fallido");
      }
    } catch (error) {
      throw error;
    }
    
  };

  const register = async (name, email, password) => {   
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        const userlogin = { id: data['user_login']['user']['id'],email,name: data['user']['name'], token: data['token']  }
        setUser(userlogin);
        localStorage.setItem("user", JSON.stringify(userlogin));
      } else {
        throw new Error(data.message || "Registro fallido");
      }
    } catch (error) {
      throw error;
    }
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    clearCart();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
