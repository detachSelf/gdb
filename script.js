let windowCount = 0;

document.getElementById('openWindowButton').addEventListener('click', function() {
    windowCount++;
    createNewWindow(windowCount);
});

function createNewWindow(count) {
    const windowsContainer = document.getElementById('windows-container');
    
    // Create a new window element
    const newWindow = document.createElement('div');
    newWindow.classList.add('windowElement');
    newWindow.style.top = `${Math.random() * 80}vh`; // Random vertical position
    newWindow.style.left = `${Math.random() * 80}vw`; // Random horizontal position

    // Create header
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `Window ${count} <button onclick="closeWindow(this)">X</button>`;
    
    // Create content area
    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = 'This is a new window.';

    // Append header and content to the new window
    newWindow.appendChild(header);
    newWindow.appendChild(content);

    // Append new window to the container
    windowsContainer.appendChild(newWindow);
}

function closeWindow(button) {
    const windowElement = button.parentElement.parentElement;
    windowElement.remove();
}
