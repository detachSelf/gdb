let windowCount = 0;

function openChat() {
    document.getElementById('chatWindow').style.display = 'block';
}

function closeChat() {
    document.getElementById('chatWindow').style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value;
    if (message.trim()) {
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.innerHTML += `<div>${message}</div>`;
        input.value = ''; // Clear input field
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
    }
}

function openWindow() {
    windowCount++;
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.innerHTML = `
        <div class="window-header">
            Window ${windowCount} <span class="close-button" onclick="closeWindow(this)">X</span>
        </div>
        <div class="window-content">
            <p>This is window content.</p>
        </div>
    `;

    // Set initial position
    windowElement.style.top = `${Math.random() * 400}px`;
    windowElement.style.left = `${Math.random() * 600}px`;

    document.getElementById('windows-container').appendChild(windowElement);

    makeDraggable(windowElement);
}

function closeWindow(closeButton) {
    const windowElement = closeButton.parentElement.parentElement;
    windowElement.remove();
}

function makeDraggable(element) {
    let offsetX, offsetY;

    element.querySelector('.window-header').onmousedown = function (event) {
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;

        document.onmousemove = function (event) {
            element.style.left = `${event.clientX - offsetX}px`;
            element.style.top = `${event.clientY - offsetY}px`;
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}
