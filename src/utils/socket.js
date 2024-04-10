import { Server } from "socket.io";
import { server } from "../../index.js";

let io;

export const setupSockets = (server) => {
	io = new Server(server);

	io.on('connection', socket => {
		console.log(`User ${socket.id} connected`);

		//upon connection - only to user
		// socket.emit('welcome', "Welcome to Chat App!👋");

		//upon connection - to all others
		// socket.broadcast.emit('newUser', `User ${socket.id.substring(0, 5)} connected`);

		//listening for a message event
		// socket.on('message', data => {
		// 	console.log(data);
		// 	io.emit('message', `${socket.id.substring(0, 5)} : ${data}`);
		// });

		//listening for disconnect
		socket.on('disconnect', () => {
			console.log('user is disconnected');
			// socket.broadcast.emit('disconnect', `User ${socket.id.substring(0, 5)} disconnected`);
		});

		//listen for activity and broadcast to everyone else
		socket.on('activity', (name) => {
			socket.broadcast.emit('activity', name);
		});
	});
};

export const getIo = () => {
	if (!io) setupSockets(server);

	return io;
};
