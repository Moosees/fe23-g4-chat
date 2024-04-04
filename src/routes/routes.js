import { Router } from "express";
import ChannelController from "../controller/channelController.js";
import MessageController from "../controller/messageController.js";
import UserController from "../controller/userController.js";

const router = Router();

router.put('/channel', ChannelController.createChannel);
router.post('/channel/:id', MessageController.postMsgToChannel);

router.get('/channel', ChannelController.getAllChannels);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router;
