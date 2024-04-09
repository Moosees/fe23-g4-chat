import { Router } from "express";
import MessageController from "../controller/messageController.js";

const publicRoutes = Router();

// get messages from broadcast (public) channel - body: undefined
publicRoutes.get('/broadcast', MessageController.getBroadcastMessages);

// post message to broadcast (public) channel - body: { msg, senderName }
publicRoutes.post('/broadcast', MessageController.postMsgToBroadcast);

export default publicRoutes;
