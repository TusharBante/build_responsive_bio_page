// Import required modules
const express = require('express');
const path = require('path');
const db = require('./db'); // Import MySQL connection pool

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Express GET route to fetch products from the MySQL database
app.get('/products', async (req, res) => {
  try {
    // Query products from the MySQL 'products' table
    const [rows] = await db.query('SELECT id, name, price, category, description, icon FROM products ORDER BY id ASC');
    // Return database results in JSON format
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products from database:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
