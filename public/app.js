// Get references to DOM elements
const productsContainer = document.getElementById('products-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');

// Function to fetch products from the Express backend connected to MySQL
function loadProducts() {
  // Show the spinner and hide error message / previous products
  loadingSpinner.style.display = 'flex';
  errorMessage.style.display = 'none';
  productsContainer.innerHTML = '';

  // Start Fetch API request to the /products endpoint
  fetch('/products')
    .then((response) => {
      // Check if HTTP response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse JSON database results
      return response.json();
    })
    .then((products) => {
      // Hide the spinner on success
      loadingSpinner.style.display = 'none';

      // Check if products array from database is empty
      if (products.length === 0) {
        productsContainer.innerHTML = '<p class="empty-text">No products available in the database.</p>';
        return;
      }

      // Dynamically create and render each product card
      products.forEach((product) => {
        const card = document.createElement('article');
        card.className = 'product-card';

        // Parse price safely in case decimal is returned as string by MySQL
        const formattedPrice = Number(product.price).toFixed(2);

        card.innerHTML = `
          <div class="product-icon">${product.icon || '📦'}</div>
          <div class="product-body">
            <span class="product-category">${product.category}</span>
            <h2 class="product-title">${product.name}</h2>
            <p class="product-description">${product.description || ''}</p>
            <div class="product-footer">
              <span class="product-price">$${formattedPrice}</span>
              <button class="buy-button" onclick="alert('Added ${product.name} to cart!')">Buy Now</button>
            </div>
          </div>
        `;

        productsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      // Hide the spinner on failure
      loadingSpinner.style.display = 'none';

      // Display user-friendly error message
      console.error('Failed to load products:', error);
      errorMessage.style.display = 'block';
    });
}

// Fetch products when the page loads
loadProducts();
