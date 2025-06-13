import { API_URL } from '../utils/apiConfig';

export const iniciarPago = async (cartItems, user) => {
  const res = await fetch(`${API_URL}/crear-transaccion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    },
    body: JSON.stringify({ 
        buyerId: user.id,
        items: cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price
        })) 
    })
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error al iniciar pago");

  return data; // URL de redirección a Webpay
};