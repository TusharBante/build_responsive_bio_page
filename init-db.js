const mysql = require('mysql2/promise');

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 3306
  });

  console.log('Connected to MySQL server.');

  // Create database if not exists
  await connection.query('CREATE DATABASE IF NOT EXISTS product_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
  await connection.query('USE product_db;');

  // Create products table if not exists
  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT,
      icon VARCHAR(50) DEFAULT '📦',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  // Check if table is empty, and seed sample products
  const [rows] = await connection.query('SELECT COUNT(*) as total FROM products;');
  if (rows[0].total === 0) {
    const seedProducts = [
      ['Wireless Bluetooth Headphones', 59.99, 'Electronics', 'High-quality sound with noise-cancellation and 30-hour battery life.', '🎧'],
      ['Ergonomic Desk Chair', 149.99, 'Furniture', 'Breathable mesh back with adjustable lumbar support and armrests.', '🪑'],
      ['Stainless Steel Water Bottle', 24.50, 'Fitness', 'Double-walled vacuum insulated bottle keeps drinks cold for 24 hours.', '🍶'],
      ['Mechanical Gaming Keyboard', 89.99, 'Electronics', 'RGB backlit mechanical switches with durable aluminum frame.', '⌨️'],
      ['Eco-Friendly Backpack', 45.00, 'Accessories', 'Durable canvas backpack with a padded 15-inch laptop sleeve.', '🎒'],
      ['Smart Fitness Tracker', 69.95, 'Electronics', 'Monitors heart rate, daily steps, workouts, and sleep quality.', '⌚']
    ];

    await connection.query(
      'INSERT INTO products (name, price, category, description, icon) VALUES ?;',
      [seedProducts]
    );
    console.log('Sample products seeded successfully into MySQL.');
  } else {
    console.log(`Database already has ${rows[0].total} products.`);
  }

  await connection.end();
}

initializeDatabase()
  .then(() => console.log('Database initialization completed successfully.'))
  .catch((err) => {
    console.error('Error initializing database:', err);
    process.exit(1);
  });
