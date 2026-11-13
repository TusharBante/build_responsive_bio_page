import React from 'react';
import { ProductProvider } from './context/ProductContext';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

// Main Application Component wrapped with ProductProvider (eliminates prop drilling)
function App() {
  return (
    <ProductProvider>
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>🛍️ Product Catalog</h1>
          <p className="subtitle">
            React Context API &bull; Express API &bull; MySQL Database
          </p>
        </header>

        {/* Search Bar consuming ProductContext */}
        <SearchBar />

        {/* Main Content: ProductList consuming ProductContext */}
        <main>
          <ProductList />
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>Simple React Context API Product List Application</p>
        </footer>
      </div>
    </ProductProvider>
  );
}

export default App;
