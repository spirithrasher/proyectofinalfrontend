import React from 'react';
import ProductCard from './ProductCard';
import products from '../data/products.json';

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
