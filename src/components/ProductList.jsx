import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// ProductList Component: Fetches products and manages loading/error states
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data on component mount
  useEffect(() => {
    fetch('/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch products (HTTP ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Unable to load products. Please ensure the Express server and MySQL database are running.');
        setLoading(false);
      });
  }, []);

  // 1. Loading State: Display spinning loader
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // 2. Error State: Display user-friendly alert
  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">⚠️ {error}</p>
      </div>
    );
  }

  // 3. Empty State: No products found
  if (products.length === 0) {
    return <p className="empty-text">No products available in the database.</p>;
  }

  // 4. Success State: Render list of ProductCard components
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
