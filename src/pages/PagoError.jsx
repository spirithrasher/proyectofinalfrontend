import React from 'react';

const PagoError = () => {
  return (
    <div className="p-5 text-center">
      <h1>❌ Error en el pago</h1>
      <p>No pudimos procesar tu transacción. Intenta nuevamente.</p>
    </div>
  );
};

export default PagoError;