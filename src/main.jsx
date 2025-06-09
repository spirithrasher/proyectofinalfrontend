import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <CartProvider>
      <AuthProvider>
        
          <App />
        
      </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
