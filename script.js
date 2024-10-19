let windowCount = 0;

// Toggle the chat box
document.getElementById('toggleChatButton').addEventListener('click', function() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('hidden'); // Toggle visibility
});

// Handle tab switching
const tabs = document.querySelectorAll('.tab');
const chatSections = document.querySelectorAll('.chat-section');

// Add click event to each tab
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove "active" class from all sections and hide them
        chatSections.forEach(section => section.classList.remove('active'));
        chatSections.forEach(section => section.classList.add('hidden'));

        // Add "active" class to the selected section and display it
        chatSections[index].classList.add('active');
        chatSections[index].classList.remove('hidden');
    });
});

document.getElementById('openWindowButton').addEventListener('click', function() {
    windowCount++;
    createNewWindow(windowCount);
});

function createNewWindow(count) {
    const windowsContainer = document.getElementById('windows-container');
    
    // Create a new window element
    const newWindow = document.createElement('div');
    newWindow.classList.add('windowElement');

    // Get viewport width and height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set window size
    const windowWidth = 300;
    const windowHeight = 200;

    // Calculate random top and left positions within the viewport bounds
    const maxLeft = viewportWidth - windowWidth;
    const maxTop = viewportHeight - windowHeight;

    newWindow.style.top = `${Math.random() * maxTop}px`;
    newWindow.style.left = `${Math.random() * maxLeft}px`;

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

function dragWindow(e, windowElement) {
    e.preventDefault();

    const rect = windowElement.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    function moveAt(e) {
        let newTop = e.clientY - offsetY;
        let newLeft = e.clientX - offsetX;

        const windowWidth = windowElement.offsetWidth;
        const windowHeight = windowElement.offsetHeight;

        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - windowWidth));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - windowHeight));

        windowElement.style.top = `${newTop}px`;
        windowElement.style.left = `${newLeft}px`;
    }

    document.addEventListener('mousemove', moveAt);

    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', moveAt);
    }, { once: true });
}

function closeWindow(button) {
    const windowElement = button.parentElement.parentElement;
    windowElement.remove();
}
