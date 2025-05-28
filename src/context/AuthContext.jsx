// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // guarda el usuario

  useEffect(() => {
    // Recuperar usuario si está guardado
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
        // Simular un pequeño delay de red
        setTimeout(() => {
        // Puedes usar cualquier validación simple aquí
        if (email === "test@demo.com" && password === "123456") {
            const fakeUser = { email, name: "Usuario Demo" };
            setUser(fakeUser);
            localStorage.setItem("user", JSON.stringify(fakeUser));
            resolve();
        } else {
            reject(new Error("Correo o contraseña inválidos"));
        }
        }, 1000); // simula 1 segundo de delay
    });
    // Aquí haces una llamada al backend para autenticar
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await res.json();
    // if (res.ok) {
    //   setUser(data.user);
    //   localStorage.setItem("user", JSON.stringify(data.user));
    // } else {
    //   throw new Error(data.message || "Login failed");
    // }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
