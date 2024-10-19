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
    
    // Add dragging behavior to the header
    header.addEventListener('mousedown', function(e) {
        dragWindow(e, newWindow);
    });

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

// Function to handle closing a window
function closeWindow(button) {
    const windowElement = button.parentElement.parentElement;
    windowElement.remove();
}

// Dragging logic
function dragWindow(e, windowElement) {
    e.preventDefault();

    // Get the current position of the window in pixels
    const rect = windowElement.getBoundingClientRect();

    // Calculate the offset between where the mouse is clicked and the window's top-left corner
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;

    // Function to move the window
    function moveAt(e) {
        let newTop = e.clientY - offsetY;
        let newLeft = e.clientX - offsetX;
        windowElement.style.top = `${newTop}px`;
        windowElement.style.left = `${newLeft}px`;
    }

    // Move the window as the mouse moves
    document.addEventListener('mousemove', moveAt);

    // Stop dragging when the mouse is released
    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', moveAt);
    }, { once: true });
}

