const socket = io('ws://localhost:3000');

//send message function
function sendMessage(e) {
	e.preventDefault();
	const input = document.querySelector('input');
	if (input.value) {
		socket.emit('message', input.value);
		input.value = "";
	}
	input.focus;
}

document.querySelector('form')
	.addEventListener('submit', sendMessage); //submit the whole form while pressing enter or button

//listen for messages
socket.on("message", (data) => {
	const li = document.createElement('li');
	li.textContent = data;
	document.querySelector('ul').appendChild(li);
});
