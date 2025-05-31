import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import products from '../data/products.json';

function ProductsSection({ onAddToCart }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoriaId = parseInt(params.get('categoria'));

  // Filtrar productos si hay una categoría seleccionada
  const filteredProducts = categoriaId
    ? products.filter(product => product.categoria_id === categoriaId)
    : products;

  return (
    <section id="products" className="py-5">
      <div className="container my-5">
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center">No hay productos en esta categoría.</p>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;
