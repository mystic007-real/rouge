const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);

    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (parsedUrl.pathname === '/styles.css' && req.method === 'GET') {
        fs.readFile('styles.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (parsedUrl.pathname === '/app.js' && req.method === 'GET') {
        fs.readFile('app.js', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else if (parsedUrl.pathname === '/data.json' && req.method === 'GET') {
        fs.readFile(dataPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
