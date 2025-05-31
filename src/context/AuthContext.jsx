// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    // Mock (simulación de backend)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@demo.com" && password === "123456") {
          const fakeUser = { email, name: "Usuario Demo" };
          setUser(fakeUser);
          localStorage.setItem("user", JSON.stringify(fakeUser));
          resolve();
        } else {
          reject(new Error("Correo o contraseña inválidos"));
        }
      }, 1000);
    });

    // Para conectar con backend con Express:
    /*
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message || "Login fallido");
      }
    } catch (error) {
      throw error;
    }
    */
  };

  const register = async (name, email, password) => {
    // Mock (simulación de backend)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email.includes("@") || password.length < 6) {
          reject(new Error("Datos inválidos"));
        } else {
          const newUser = { name, email };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          resolve();
        }
      }, 1000);
    });

    // Para conectar con backend con Express:
    /*
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message || "Registro fallido");
      }
    } catch (error) {
      throw error;
    }
    */
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
