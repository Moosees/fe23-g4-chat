import { Router } from "express";
import ChannelController from "../controller/channelController.js";
import MessageController from "../controller/messageController.js";

const chatRoutes = Router();

chatRoutes.put('/channel', ChannelController.createChannel);
chatRoutes.post('/channel/:id', MessageController.postMsgToChannel);

chatRoutes.get('/channel', ChannelController.getAllChannels);

// Route for retrieving messages by channel name
chatRoutes.get('/channel/:name', MessageController.getMessagesByChannel);

chatRoutes.delete('/channel/:name', ChannelController.deleteChannel);


export default chatRoutes;
