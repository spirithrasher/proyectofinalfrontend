import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import products from '../data/products.json';

const categorias = [
  { id: 1, nombre: "Electrónica" },
  { id: 2, nombre: "Ropa" },
  { id: 3, nombre: "Hogar" },
];

function ProductsSection({ onAddToCart }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoriaId = parseInt(params.get('categoria'));

  const categoria = categorias.find(cat => cat.id === categoriaId);
  const categoriaNombre = categoria ? categoria.nombre : "Todos los productos";

  // Filtrar productos si hay una categoría seleccionada
  const filteredProducts = categoriaId
    ? products.filter(product => product.categoria_id === categoriaId)
    : products;

  return (
    <section id="products" className="py-5">
      <div className="container my-5">
        <h2 className="mb-4 text-center">{categoriaNombre}</h2>
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
