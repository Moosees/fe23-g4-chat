import 'dotenv/config';
import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";
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

app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
