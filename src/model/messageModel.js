import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		body: { type: String, minLength: 1, maxLength: 240 },
		// Name of the sender, with a default value set to "Anonymous"
		senderName: String, // New field for sender's name, only used to non logged in messages
		sentAt: { type: Date, default: Date.now },
		channel: {
			type: Schema.Types.ObjectId,
			ref: 'Channel'
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	});

const Message = mongoose.model('Message', messageSchema);

export default Message;
