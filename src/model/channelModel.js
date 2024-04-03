import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	created: { type: Date, default: Date.now }
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;
