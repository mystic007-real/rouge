const express = require('express');
const app = express();
const path = require('path');

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle search queries
app.get('/search', (req, res) => {
    const query = req.query.q;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // Redirect to Ultraviolet with the Google search URL
    res.redirect(`/uv/service/${Buffer.from(googleUrl).toString('base64')}`);
});

// Static files for Ultraviolet
app.use('/uv', express.static(path.join(__dirname, 'uv')));

// Start the server
app.listen(3000, () => {
    console.log('Proxy running on port 3000');
});
