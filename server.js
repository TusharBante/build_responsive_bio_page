// Import required modules
const express = require('express');
const path = require('path');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Sample product dataset
const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 59.99,
    category: 'Electronics',
    description: 'High-quality sound with noise-cancellation and 30-hour battery life.',
    icon: '🎧'
  },
  {
    id: 2,
    name: 'Ergonomic Desk Chair',
    price: 149.99,
    category: 'Furniture',
    description: 'Breathable mesh back with adjustable lumbar support and armrests.',
    icon: '🪑'
  },
  {
    id: 3,
    name: 'Stainless Steel Water Bottle',
    price: 24.50,
    category: 'Fitness',
    description: 'Double-walled vacuum insulated bottle keeps drinks cold for 24 hours.',
    icon: '🍶'
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard',
    price: 89.99,
    category: 'Electronics',
    description: 'RGB backlit mechanical switches with durable aluminum frame.',
    icon: '⌨️'
  },
  {
    id: 5,
    name: 'Eco-Friendly Backpack',
    price: 45.00,
    category: 'Accessories',
    description: 'Durable canvas backpack with a padded 15-inch laptop sleeve.',
    icon: '🎒'
  },
  {
    id: 6,
    name: 'Smart Fitness Tracker',
    price: 69.95,
    category: 'Electronics',
    description: 'Monitors heart rate, daily steps, workouts, and sleep quality.',
    icon: '⌚'
  }
];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to return product list in JSON format
app.get('/products', (req, res) => {
  res.json(products);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
