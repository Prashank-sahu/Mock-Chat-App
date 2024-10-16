// Predefined users
const users = ['Alice', 'Bob', 'Charlie'];

// Randomly select current user
const currentUser = users[Math.floor(Math.random() * users.length)];

// DOM elements
const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const userList = document.getElementById('userList');

// Load messages from local storage
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

// Render initial messages and user list
renderMessages();
renderUserList();

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text) {
        const newMessage = {
            id: Date.now(),
            user: currentUser,
            text: text,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        renderMessages();
        messageInput.value = '';
    }
}

function renderMessages() {
    chatWindow.innerHTML = messages.map(message => `
        <div class="message ${message.user === currentUser ? 'own-message' : ''}">
            <span class="user">${message.user}:</span>
            <span class="text">${message.text}</span>
            <span class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
    `).join('');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function renderUserList() {
    userList.innerHTML = users.map(user => `
        <li>${user}${user === currentUser ? ' (You)' : ''}</li>
    `).join('');
}
