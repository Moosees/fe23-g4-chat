import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import { createServer } from 'node:http';
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import { requiresLoggedIn, verifyUser } from './src/middleware/auth.js';
import chatRoutes from './src/routes/chatRoutes.js';
import publicRoutes from "./src/routes/publicRoutes.js";
import userRoutes from './src/routes/userRoutes.js';

// express setup
const port = 3000;
const app = express();
const server = createServer(app);
app.use(express.json());

/**** socket.io ****/
const io = new Server(server);

io.on('connection', socket => {
	console.log(`User ${socket.id} connected`);

	//upon connection - only to user
	socket.emit('message', "Welcome to Chat App!👋");

	//upon connection - to all others
	socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} connected`);

	//listening for a message event
	socket.on('message', data => {
		console.log(data);
		io.emit('message', `${socket.id.substring(0, 5)} : ${data}`);
	});

	//listening for disconnect
	socket.on('disconnect', () => {
		console.log('user is disconnected');
		socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} disconnected`);
	});

	//listen for activity 
	socket.on('activity', (name) => {
		socket.broadcast.emit('activity', name);
	});
});

// database
mongoose.connect(process.env.MONGODB).then(async () => {
	console.log('mongodb connected');
	// // Create broadcast channel - If the Broadcast channel already exists, this can be removed/commented out
	//import ChannelService from "./src/service/channelService.js";
	// // Check if the broadcast channel already exists
	// const broadcastChannelExists = await ChannelService.getChannelByName("broadcast");

	// if (!broadcastChannelExists) {
	//     // If the broadcast channel doesn't exist, create it
	//     try {
	//         await ChannelService.createChannel("broadcast", "Broadcast Channel");
	//         console.log('Broadcast channel created');
	//     } catch (error) {
	//         console.error('Error creating broadcast channel:', error);
	//     }
	// } else {
	//     console.log('Broadcast channel already exists');
	// }
});

// static files (client)
const __dirname = dirname(fileURLToPath(import.meta.url));

// static files (client)
app.use('/', express.static(join(__dirname, 'public')));

// routes
app.use('/api', userRoutes);
app.use('/api', verifyUser, publicRoutes);
app.use('/api', verifyUser, requiresLoggedIn, chatRoutes);

// run server
server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

