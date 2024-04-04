import { Router } from "express";
import ChannelController from "../controller/channelController.js";
import MessageController from "../controller/messageController.js";

const router = Router();

router.put('/channel', ChannelController.createChannel);
router.post('/channel/:id', MessageController.postMsgToChannel);

router.get('/channel', ChannelController.getAllChannels);

export default router;
