import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Product Context
export const ProductContext = createContext();

// 2. Create the Product Provider component
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from Express API
  const fetchProducts = () => {
    setLoading(true);
    setError(null);

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
  };

  // Fetch products on initial mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by name or category based on search query
  const filteredProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = product.name?.toLowerCase().includes(query);
    const categoryMatch = product.category?.toLowerCase().includes(query);
    return nameMatch || categoryMatch;
  });

  // Value object provided to consuming components via useContext()
  const contextValue = {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchProducts
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
