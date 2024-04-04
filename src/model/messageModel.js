import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		body: { type: String, minLength: 1, maxLength: 240 },
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
