import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		body: String,
		sentAt: { type: Date, default: Date.now },
		channelId: {
			type: Schema.ObjectId,
			ref: 'Channel'
		},
		userId: {
			type: Schema.ObjectId,
			ref: 'User'
		}
	});

const Message = mongoose.model('Message', messageSchema);

export default Message;
