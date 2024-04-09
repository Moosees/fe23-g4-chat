// test axios and socket
console.log({ io, axios });

// Function to handle form submission
async function handleSubmit(event) {
	// Prevent the default form submission behavior
	event.preventDefault();
	// Retrieve sender's name and message content from the form
	const senderName = document.getElementById('sender-name').value;
	const message = document.getElementById('message').value;

	try {
		// Send a POST request to the backend API with message data
		const response = await fetch('/api/broadcast', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				senderName,
				msg: message
			})
		});

		// Check if the request was successful
		if (response.ok) {
			// Clear form fields after successful submission
			document.getElementById('sender-name').value = '';
			document.getElementById('message').value = '';
			// Fetch messages again to update the message list
			fetchMessages();
		} else {
			// Log an error message if the request was not successful
			console.error('Failed to post message:', response.statusText);
		}
	} catch (error) {
		// Log an error message if there was an error during the request
		console.error('Error posting message:', error);
	}
}

// Fetch messages from the backend API
async function fetchMessages() {
	try {
		// Send a GET request to retrieve messages from the backend
		const response = await fetch('/api/broadcast');
		// Parse the JSON response into a JavaScript object
		const messages = await response.json();

		// Get the container for displaying messages
		const messagesContainer = document.getElementById('messages-container');
		// Clear the existing messages displayed in the container
		messagesContainer.innerHTML = '';

		// Check if there are any messages available
		if (messages.length === 0) {
			// Display a message indicating that no messages are found
			messagesContainer.innerHTML = '<p>No messages found</p>';
		} else {
			// Iterate through each message and create HTML elements to display them
			messages.forEach(message => {
				const messageElement = document.createElement('div');
				messageElement.classList.add('message');
				// Populate the message HTML with sender's name, message content, and sent timestamp
				messageElement.innerHTML = `
                    <p><strong>${message.senderName}</strong>: ${message.body}</p>
                    <p>Sent at: ${new Date(message.sentAt).toLocaleString()}</p>
                `;
				// Append the message HTML to the messages container
				messagesContainer.appendChild(messageElement);
			});
		}
	} catch (error) {
		// Log an error message if there was an error fetching messages
		console.error('Error fetching messages:', error);
	}
}

// Fetch messages when the page loads
fetchMessages();

// Add event listener to the form submission event
document.getElementById('message-form').addEventListener('submit', handleSubmit);
