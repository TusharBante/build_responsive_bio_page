// Import required modules
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('./db'); // Import MySQL connection pool

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-jwt-key-for-product-app-demo';

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Validation rules for product creation
const validateProduct = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required.')
    .isLength({ min: 2 }).withMessage('Product name must be at least 2 characters long.'),
  body('price')
    .notEmpty().withMessage('Price is required.')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0.'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required.'),
  body('description')
    .optional()
    .trim(),
  body('icon')
    .optional()
    .trim()
];

// Validation rules for login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

// Express POST /login route for JWT authentication
app.post('/login', validateLogin, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  const { email, password } = req.body;

  // Generate JWT token with 24h expiration
  const token = jwt.sign(
    { email, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      email,
      name: email.split('@')[0]
    }
  });
});

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

// Express POST route to add a new product with input validation
app.post('/products', validateProduct, async (req, res) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  const { name, price, category, description, icon } = req.body;

  try {
    // Parameterized SQL query to prevent SQL injection
    const sql = 'INSERT INTO products (name, price, category, description, icon) VALUES (?, ?, ?, ?, ?)';
    const values = [
      name,
      parseFloat(price),
      category,
      description || '',
      icon || '📦'
    ];

    const [result] = await db.query(sql, values);

    // Return success response with newly created product
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: {
        id: result.insertId,
        name,
        price: parseFloat(price),
        category,
        description: description || '',
        icon: icon || '📦'
      }
    });
  } catch (error) {
    console.error('Error inserting product into database:', error);
    res.status(500).json({ success: false, error: 'Database insert failed' });
  }
});

// SPA client-side routing fallback (serves index.html for all non-API GET requests)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/products')) {
    return res.sendFile('index.html', { root: path.resolve(__dirname, 'public') });
  }
  next();
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
