// Import the mysql2 package
const mysql = require('mysql2');

// Configure a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'product_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check database pool connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Failed to connect to MySQL database:', err.message);
  } else {
    console.log('Connected to MySQL connection pool successfully.');
    connection.release();
  }
});

// Export the pool with promise wrapper for async/await queries
module.exports = pool.promise();
