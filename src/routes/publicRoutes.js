import { Router } from "express";
import MessageController from "../controller/messageController.js";
const publicRoutes = Router();

// Route for retrieving messages from the broadcast channel
publicRoutes.get('/broadcast', MessageController.getBroadcastMessages);

// Route for posting messages to the broadcast channel
publicRoutes.post('/broadcast', MessageController.postMsgToBroadcast);

export default publicRoutes;
