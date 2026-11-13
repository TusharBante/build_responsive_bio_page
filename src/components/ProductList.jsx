import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

// ProductList component consumes products, loading, error from ProductContext via useContext()
function ProductList() {
  const { filteredProducts, loading, error, searchTerm, fetchProducts } = useContext(ProductContext);

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
        <button
          type="button"
          className="retry-btn"
          onClick={fetchProducts}
        >
          Try Again
        </button>
      </div>
    );
  }

  // 3. Empty State: No products matching search or empty database
  if (filteredProducts.length === 0) {
    return (
      <div className="empty-container">
        <p className="empty-text">
          {searchTerm
            ? `No products found matching "${searchTerm}".`
            : 'No products available in the database.'}
        </p>
      </div>
    );
  }

  // 4. Success State: Render list of ProductCard components
  return (
    <div className="products-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
