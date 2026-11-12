import React from 'react';
import ProductList from './components/ProductList';

// Main Application Component
function App() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🛍️ Product Catalog</h1>
        <p className="subtitle">
          Interactive React frontend powered by an Express API & MySQL database
        </p>
      </header>

      {/* Main Content with ProductList */}
      <main>
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Simple React &bull; Express &bull; MySQL Product List Application</p>
      </footer>
    </div>
  );
}

export default App;
