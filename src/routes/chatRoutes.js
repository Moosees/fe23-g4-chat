import { Router } from "express";
import ChannelController from "../controller/channelController.js";
import MessageController from "../controller/messageController.js";

const chatRoutes = Router();

chatRoutes.put('/channel', ChannelController.createChannel);
chatRoutes.post('/channel/:id', MessageController.postMsgToChannel);

chatRoutes.get('/channel', ChannelController.getAllChannels);

// Route for retrieving messages by channel name
chatRoutes.get('/channel/:name', MessageController.getMessagesByChannel);

// Route for retrieving messages from the broadcast channel
chatRoutes.get('/broadcast', MessageController.getBroadcastMessages);

// Route for posting messages to the broadcast channel
chatRoutes.post('/broadcast', MessageController.postMsgToBroadcast);


export default chatRoutes;
