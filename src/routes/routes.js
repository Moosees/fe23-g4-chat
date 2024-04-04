import { Router } from "express";
import ChannelController from "../controller/channelController.js";

const router = Router();

router.put('/channel', ChannelController.createChannel);

router.get('/channel', ChannelController.getAllChannels);

export default router;
