import { Router } from "express";
import { getChannel } from "../controller/channel.js";

const router = Router();

router.get('/broadcast', getChannel);

export default router;
