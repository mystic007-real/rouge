const express = require('express');
const app = express();
const rammerhead = require('rammerhead');  // Assuming Rammerhead is set up as a module

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle search queries
app.get('/search', (req, res) => {
    const query = req.query.q;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    // Use Rammerhead to proxy the request
    rammerhead.proxyRequest(googleUrl, req, res);
});

app.listen(3000, () => {
    console.log('Proxy running on port 3000');
});
