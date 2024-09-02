const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle chatroom message requests
app.get('/chatroom/:roomCode', (req, res) => {
    const roomCode = req.params.roomCode;
    const filePath = path.join(__dirname, 'data', `${roomCode}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json([]);
        }
        res.json(JSON.parse(data));
    });
});

// Handle chatroom message saving
app.post('/chatroom/:roomCode', express.json(), (req, res) => {
    const roomCode = req.params.roomCode;
    const filePath = path.join(__dirname, 'data', `${roomCode}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err) {
            messages = JSON.parse(data);
        }

        messages.push(req.body);

        fs.writeFile(filePath, JSON.stringify(messages), (err) => {
            if (err) {
                return res.status(500).send('Error saving message');
            }
            res.status(200).send('Message saved');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
