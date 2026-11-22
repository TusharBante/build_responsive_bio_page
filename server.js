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

// Authentication middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired authentication token.'
      });
    }
    req.user = user;
    next();
  });
};

// Role-Based Access Control (RBAC) middleware: Restricts route to admin only
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access forbidden. Admin privileges required.'
    });
  }
  next();
};

// Validation rules for product creation and updates
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

// Express POST /login route with Role included in JWT
app.post('/login', validateLogin, async (req, res) => {
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

  try {
    // Look up user in MySQL database
    const [users] = await db.query('SELECT id, email, password, name, role FROM users WHERE email = ?', [email]);
    let user = users[0];

    // If user not found in database, fallback for demo testing
    if (!user) {
      const isDemoAdmin = email.toLowerCase().includes('admin');
      user = {
        id: 99,
        email,
        name: email.split('@')[0],
        role: isDemoAdmin ? 'admin' : 'user'
      };
    } else if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Include the user's role in the JWT token payload
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// Express GET route to fetch products (Allowed for regular users and public)
app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, price, category, description, icon FROM products ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products from database:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Express POST route: Create product (Admin only)
app.post('/products', authenticateToken, requireAdmin, validateProduct, async (req, res) => {
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
    const sql = 'INSERT INTO products (name, price, category, description, icon) VALUES (?, ?, ?, ?, ?)';
    const values = [
      name,
      parseFloat(price),
      category,
      description || '',
      icon || '📦'
    ];

    const [result] = await db.query(sql, values);

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

// Express PUT route: Update product (Admin only)
app.put('/products/:id', authenticateToken, requireAdmin, validateProduct, async (req, res) => {
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

  const { id } = req.params;
  const { name, price, category, description, icon } = req.body;

  try {
    const sql = 'UPDATE products SET name = ?, price = ?, category = ?, description = ?, icon = ? WHERE id = ?';
    const values = [
      name,
      parseFloat(price),
      category,
      description || '',
      icon || '📦',
      id
    ];

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: {
        id: parseInt(id),
        name,
        price: parseFloat(price),
        category,
        description: description || '',
        icon: icon || '📦'
      }
    });
  } catch (error) {
    console.error('Error updating product in database:', error);
    res.status(500).json({ success: false, error: 'Database update failed' });
  }
});

// Express DELETE route: Delete product (Admin only)
app.delete('/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      id: parseInt(id)
    });
  } catch (error) {
    console.error('Error deleting product from database:', error);
    res.status(500).json({ success: false, error: 'Database deletion failed' });
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
