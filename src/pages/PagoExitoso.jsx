import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PagoExitoso = () => {
  const [mensaje, setMensaje] = useState('Confirmando pago...');
  const [searchParams] = useSearchParams();
   const navigate = useNavigate();

  useEffect(() => {
    // Puedes verificar algún parámetro si deseas
    const token = searchParams.get('token_ws');

    if (token) {
      // Si quieres mostrar algo distinto según el token
      setMensaje('¡Pago realizado con éxito! 🎉');
    } else {
      setMensaje('Pago procesado. Gracias por tu compra.');
    }
    const storedCart = localStorage.removeItem('cart');
    
    // Redirigir después de 3 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [searchParams]);

  return (
    <div className="text-center p-5">
      <h1>{mensaje}</h1>
      <p>Tu transacción fue procesada correctamente. Pronto recibirás confirmación.</p>
    </div>
  );
};

export default PagoExitoso;
