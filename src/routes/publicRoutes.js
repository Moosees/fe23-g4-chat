import { Router } from "express";
import MessageController from "../controller/messageController.js";

const publicRoutes = Router();

// get messages from broadcast (public) channel - body: undefined
publicRoutes.get('/broadcast', MessageController.getMessagesByChannel);
publicRoutes.get('/channel/broadcast', MessageController.getMessagesByChannel);

// post message to broadcast (public) channel - body: { msg, senderName }
publicRoutes.post('/broadcast', MessageController.postMsgToChannel);
publicRoutes.post('/channel/broadcast', MessageController.postMsgToChannel);

export default publicRoutes;
