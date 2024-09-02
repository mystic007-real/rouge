const express = require('express');
const rammerhead = require('rammerhead');
const path = require('path');

const app = express();

// Serve static files (like your index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy requests to Rammerhead
app.use('/go/', rammerhead());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
