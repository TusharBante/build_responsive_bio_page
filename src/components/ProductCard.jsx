import React from 'react';

// Reusable Product Card Component
function ProductCard({ product }) {
  // Format price safely as a 2-decimal number
  const formattedPrice = Number(product.price).toFixed(2);

  return (
    <article className="product-card">
      <div className="product-icon">{product.icon || '📦'}</div>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description || ''}</p>
        <div className="product-footer">
          <span className="product-price">${formattedPrice}</span>
          <button
            type="button"
            className="buy-button"
            onClick={() => alert(`Added ${product.name} to cart!`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
