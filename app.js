const express = require('express');
const path = require('path');
const app = express();

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Proxy requests to Rammerhead
app.use('/go/', require('rammerhead'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
