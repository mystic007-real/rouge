const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

let chatrooms = {};
if (fs.existsSync(dataPath)) {
    chatrooms = JSON.parse(fs.readFileSync(dataPath));
}

function createChatroom() {
    const username = document.getElementById('username').value;
    if (username === '') {
        alert('Please enter a username');
        return;
    }

    const chatroomCode = generateRandomCode();
    chatrooms[chatroomCode] = { users: [username], messages: [] };
    fs.writeFileSync(dataPath, JSON.stringify(chatrooms));
    joinChatroom(chatroomCode);
}

function joinChatroom(code = document.getElementById('chatroom-code').value) {
    const username = document.getElementById('username').value;
    if (username === '' || !chatrooms[code]) {
        alert('Invalid chatroom code or username');
        return;
    }

    document.getElementById('start-page').style.display = 'none';
    document.getElementById('chatroom').style.display = 'flex';
    document.getElementById('chatroom-name').innerText = code;
    loadMessages(code);
}

function loadMessages(code) {
    const messages = chatrooms[code].messages;
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.classList.add('message');
        msgElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text} <span class="timestamp">${msg.timestamp}</span>`;
        messagesContainer.appendChild(msgElement);
    });
}

function sendMessage() {
    const code = document.getElementById('chatroom-name').innerText;
    const username = document.getElementById('username').value;
    const text = document.getElementById('message-input').value;
    if (text === '') return;

    const timestamp = new Date().toLocaleTimeString();
    chatrooms[code].messages.push({ username, text, timestamp });
    fs.writeFileSync(dataPath, JSON.stringify(chatrooms));
    loadMessages(code);
    document.getElementById('message-input').value = '';
}

function generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

document.querySelector('button').addEventListener('click', () => {
    if (document.querySelector('button').innerText === 'Create Chatroom') {
        createChatroom();
    } else {
        joinChatroom();
    }
});
