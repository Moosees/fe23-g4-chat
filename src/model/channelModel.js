import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema({
	name: {
		type: String,
		index: true,
		unique: true,
		lowercase: true,
		required: true,
		minLength: 4,
		maxLength: 20
	},
	description: { type: String, maxLength: 240 },
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	created: { type: Date, default: Date.now }
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;
