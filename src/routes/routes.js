import { Router } from "express";
import ChannelController from "../controller/channelController.js";
import MessageController from "../controller/messageController.js";

const router = Router();

router.put('/channel', ChannelController.createChannel);
router.post('/channel/:id', MessageController.postMsgToChannel);

router.get('/channel', ChannelController.getAllChannels);

// Route for retrieving messages from the broadcast channel
router.get('/broadcast', MessageController.getBroadcastMessages);

// Route for posting messages to the broadcast channel
router.post('/broadcast', MessageController.postMsgToBroadcast);


export default router;
