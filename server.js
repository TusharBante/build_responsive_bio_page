// Import required modules
const express = require('express');
const path = require('path');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
