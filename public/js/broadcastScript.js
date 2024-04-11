// channel switcher for debugging
const channelAddress = '/api/channel/newtest';
// const channelAddress = '/api/broadcast';

// socket global variable
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
		const response = await axios.post(channelAddress, {
			senderName: senderNameInput.value,
			msg: messageInput.value
		});

		// Check if the request was successful
		if (response.status === 200) {
			// Clear form fields after successful submission
			messageInput.value = '';
		}
	} catch (error) {
		// Log an error message if there was an error during the request
		console.error('Error posting message:', error);
	}
}

// Add event listener to the form submission event
messageForm.addEventListener('submit', handleSubmit);

// append a message to the chat history
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
		const { data } = await axios.get(channelAddress);

		// Clear the existing messages displayed in the container
		messagesContainer.innerHTML = '';

		// Check if there are any messages available
		if (data.length === 0) {
			// Display a message indicating that no messages are found
			messagesContainer.innerHTML = '<p>No messages found</p>';
		} else {
			// Iterate through each message and create HTML elements to display them
			data.forEach(createMessageElement);
		}
	} catch (error) {
		// Log an error message if there was an error fetching messages
		console.error(error.response.data.error);
	}
}

// Fetch messages when the page loads
fetchMessages();

// get messages from socket
socket.on("message", (data) => {
	activity.textContent = "";

	createMessageElement(data);

	window.scrollTo(0, document.body.scrollHeight);
});

// activity (xyz is typing...)
let keypressPaused;
messageInput.addEventListener('keypress', () => {
	if (keypressPaused) return;

	keypressPaused = true;
	socket.emit('activity', senderNameInput.value);

	setTimeout(() => {
		keypressPaused = false;
	}, 3000);
});

let activityTimer;
socket.on('activity', (name) => {
	activity.textContent = `😎 ${name} is typing ... `;

	//clear after 3 sec...
	if (activityTimer) clearTimeout(activityTimer);
	activityTimer = setTimeout(() => {
		activity.textContent = "";
	}, 3000);
});
