import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import { createServer } from 'node:http';
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { requiresLoggedIn, verifyUser } from './src/middleware/auth.js';
import chatRoutes from './src/routes/chatRoutes.js';
import publicRoutes from "./src/routes/publicRoutes.js";
import userRoutes from './src/routes/userRoutes.js';
import { setupBroadcast } from './src/utils/broadcast.js';
import { setupSockets } from './src/utils/socket.js';

// express setup
const port = 3000;
const app = express();
export const server = createServer(app);
app.use(express.json());

// socket.io
setupSockets(server);

// database
mongoose.connect(process.env.MONGODB).then(() => {
	console.log('mongodb connected');
	setupBroadcast();
});

// static files (client)
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/', express.static(join(__dirname, 'public')));

// locally hosted npm packages
app.get('/socket', (req, res) => {
	const filename = process.env.NODE_ENV === 'production' ? 'socket.io.min.js' : 'socket.io.js';
	res.sendFile(join(__dirname, 'node_modules/socket.io/client-dist', filename));
});
app.get('/axios', (req, res) => {
	const filename = process.env.NODE_ENV === 'production' ? 'axios.min.js' : 'axios.js';
	res.sendFile(join(__dirname, 'node_modules/axios/dist', filename));
});

// routes
app.use('/api', userRoutes);
app.use('/api', verifyUser, publicRoutes);
app.use('/api', verifyUser, requiresLoggedIn, chatRoutes);

// run server
server.listen(port, () => {
	console.log(`Super awesome chat app listening on port ${port}`);
});

