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

// Route for retrieving messages from the broadcast channel
router.get('/broadcast', MessageController.getBroadcastMessages);

// Route for posting messages to the broadcast channel
router.post('/broadcast', MessageController.postMsgToBroadcast);


export default router;
