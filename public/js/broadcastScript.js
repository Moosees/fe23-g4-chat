// test axios and socket
console.log({ io, axios });
const socket = io('ws://localhost:3000');

// static elements
// chat history list
const messagesContainer = document.getElementById('messages-container');
// message form element
const messageForm = document.getElementById('message-form');
// Retrieve sender's name and message content from the form
const senderNameInput = document.getElementById('sender-name');
const messageInput = document.getElementById('message');
// socket activity element
const activity = document.querySelector('.activity');

// Function to handle form submission
async function handleSubmit(event) {
	// Prevent the default form submission behavior
	event.preventDefault();

	try {
		// Send a POST request to the backend API with message data
		const response = await fetch('/api/broadcast', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				senderName: senderNameInput.value,
				msg: messageInput.value
			})
		});

		// Check if the request was successful
		if (response.ok) {
			// Clear form fields after successful submission
			senderNameInput.value = '';
			messageInput.value = '';
		} else {
			// Log an error message if the request was not successful
			console.error('Failed to post message:', response.statusText);
		}
	} catch (error) {
		// Log an error message if there was an error during the request
		console.error('Error posting message:', error);
	}
}

function createMessageElement(message) {
	const messageElement = document.createElement('div');
	messageElement.classList.add('message');
	// Populate the message HTML with sender's name, message content, and sent timestamp
	messageElement.innerHTML = `
							<p><strong>${message.senderName}</strong>: ${message.body}</p>
							<p>Sent at: ${new Date(message.sentAt).toLocaleString()}</p>
					`;
	// Append the message HTML to the messages container
	messagesContainer.appendChild(messageElement);
}

// Fetch messages from the backend API
async function fetchMessages() {
	try {
		// Send a GET request to retrieve messages from the backend
		const response = await fetch('/api/broadcast');
		// Parse the JSON response into a JavaScript object
		const messages = await response.json();

		// Clear the existing messages displayed in the container
		messagesContainer.innerHTML = '';

		// Check if there are any messages available
		if (messages.length === 0) {
			// Display a message indicating that no messages are found
			messagesContainer.innerHTML = '<p>No messages found</p>';
		} else {
			// Iterate through each message and create HTML elements to display them
			messages.forEach(createMessageElement);
		}
	} catch (error) {
		// Log an error message if there was an error fetching messages
		console.error('Error fetching messages:', error);
	}
}

// Fetch messages when the page loads
fetchMessages();

// Add event listener to the form submission event
messageForm.addEventListener('submit', handleSubmit);

// get messages from socket
socket.on("message", (data) => {
	activity.textContent = "";

	createMessageElement(data);

	window.scrollTo(0, document.body.scrollHeight);
});

// activity (xyz is typing...)
messageInput.addEventListener('keypress', () => {
	socket.emit('activity', socket.id.substring(0, 5));
});

let activityTimer;
socket.on('activity', (name) => {
	activity.textContent = `😎 ${name} is typing ... `;

	//clear after 3 sec...
	clearTimeout(activityTimer);
	activityTimer = setTimeout(() => {
		activity.textContent = "";
	}, 3000);
});
