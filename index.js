import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { requiresLoggedIn, verifyUser } from './src/middleware/auth.js';
import chatRoutes from './src/routes/chatRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import publicRoutes from "./src/routes/publicRoutes.js";
// Used  for create broadcast channel function
//import ChannelService from "./src/service/channelService.js";

// express setup
const port = 3000;
const app = express();
app.use(express.json());

// database
mongoose.connect(process.env.MONGODB).then(async () => {
	console.log('mongodb connected');

	// // Create broadcast channel - If the Broadcast channel already exists, this can be removed/commented out
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
app.use('/public', express.static(join(__dirname, 'public')));
app.use('/public/broadcast', express.static(join(__dirname, 'public/broadcast.html')));



// routes
app.use('/api', userRoutes);
app.use('/api', verifyUser, publicRoutes);
app.use('/api', verifyUser, requiresLoggedIn, chatRoutes);

// run server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
