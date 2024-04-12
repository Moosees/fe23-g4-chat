import { Router } from "express";
import ChannelController from "../controller/channelController.js";
import MessageController from "../controller/messageController.js";

const chatRoutes = Router();

// get all channels - body: undefined
chatRoutes.get('/channel', ChannelController.getAllChannels);
// create new channel - body: { name, description (optional) }
chatRoutes.put('/channel', ChannelController.createChannel);

// get messages from channel - body: undefined
chatRoutes.get('/channel/:channelName', MessageController.getMessagesByChannel);
// post message to channel - body: { msg }
chatRoutes.post('/channel/:channelName', MessageController.postMsgToChannel);
// delete channel and all messages - body: undefined
chatRoutes.delete('/channel/:channelName', ChannelController.deleteChannel);

export default chatRoutes;
