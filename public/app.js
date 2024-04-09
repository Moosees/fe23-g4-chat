const socket = io('ws://localhost:3000');

const activity = document.querySelector('.activity');
const msgInput = document.querySelector('input');

//send message function
function sendMessage(e) {
	e.preventDefault();
	if (msgInput.value) {
		socket.emit('message', msgInput.value);
		msgInput.value = "";
	}
	msgInput.focus;
}

document.querySelector('form')
	.addEventListener('submit', sendMessage); //submit the whole form while pressing enter or button

//listen for messages
socket.on("message", (data) => {
	activity.textContent = "";
	const li = document.createElement('li');
	li.textContent = data;
	document.querySelector('ul').appendChild(li);
	window.scrollTo(0, document.body.scrollHeight);
});

msgInput.addEventListener('keypress', () => {
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
