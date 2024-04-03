import 'dotenv/config';
import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";
import Channel from './src/model/channelModel.js';
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB).then(
	console.log('mongodb connected')
);

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
