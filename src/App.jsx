import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

// Top Navigation Bar
function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        🛍️ ProductStore
      </Link>
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Catalog
        </Link>
        <Link
          to="/add-product"
          className={`nav-link ${location.pathname === '/add-product' ? 'active' : ''}`}
        >
          ➕ Add Product
        </Link>
      </div>
    </nav>
  );
}

// Catalog View (Home Route)
function CatalogPage() {
  return (
    <>
      <header className="header">
        <h1>Product Catalog</h1>
        <p className="subtitle">
          React Context API &bull; Express API &bull; MySQL Database
        </p>
      </header>
      <SearchBar />
      <ProductList />
    </>
  );
}

// Main Application with Router and Context Provider
function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div className="container">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>Simple React &bull; Express &bull; MySQL Product List Application</p>
          </footer>
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
