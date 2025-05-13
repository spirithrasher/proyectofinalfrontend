import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Producto A', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Producto B', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Producto C', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Producto A', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Producto B', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Producto C', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Producto A', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Producto B', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Producto C', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Producto A', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 11, name: 'Producto B', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Producto C', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 13, name: 'Producto A', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 14, name: 'Producto B', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 15, name: 'Producto C', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 16, name: 'Producto A', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 17, name: 'Producto B', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 18, name: 'Producto C', price: 39.99, image: 'https://via.placeholder.com/150' },
];

function LandingPage({ onAddToCart, openCart }) {
  return (
    <>
    <section id="products" className="py-5">
      <div className="container my-5">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

export default LandingPage;
