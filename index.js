import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import { verifyUser } from './src/middleware/auth.js';
import userRoutes from './src/routes/userRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';
// Used  for create broadcast channel function
//import ChannelService from "./src/service/channelService.js";

const app = express();
const port = 3000;

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

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', verifyUser, chatRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
