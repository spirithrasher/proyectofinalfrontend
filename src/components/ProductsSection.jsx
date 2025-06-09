import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../utils/css//ProductsSection.css';
import { API_URL } from '../utils/apiConfig';
// import products from '../data/products.json';
// import categorias from '../data/categorias.json';

function ProductsSection({ onAddToCart }) {
  const { search } = useLocation();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${API_URL}/productos`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
      ); // Ajusta tu URL/API
      if (!response.ok) throw new Error('Error al obtener pedidos');
      const data = await response.json();
      console.log('productos: ',data)
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    } finally {

    }
  };

  const fetchCategorias = async () => {
      try {
        const response = await fetch(`${API_URL}/categorias`); // ajustá si usás un proxy o dominio diferente
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
  };

  const params = new URLSearchParams(search);
  const categoriaId = parseInt(params.get('categoria'));
  
  const categoria = categorias.find(cat => cat.id === categoriaId);
  const categoriaNombre = categoria ? categoria.nombre : "Todos los productos";

  // Filtrar productos si hay una categoría seleccionada
  const filteredProducts = categoriaId
    ? productos.filter(product => product.category_id === categoriaId)
    : productos;

  return (
    <section id="products" className="py-5 bg-dark text-white">
    <div className="container my-5">
      <h2 className="mb-4 text-center text-warning">{categoriaNombre}</h2>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-muted">No hay productos en esta categoría.</p>
      )}
    </div>
  </section>

  );
}

export default ProductsSection;
