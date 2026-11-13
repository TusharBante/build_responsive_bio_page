import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

// SearchBar component accessing searchTerm and setSearchTerm via ProductContext
function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(ProductContext);

  return (
    <div className="search-bar-wrapper">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
