import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
    body: { type: String, minLength: 1, maxLength: 240 },
	// Name of the sender, with a default value set to "Anonymous"
    senderName: { type: String, default: "Anonymous" }, // New field for sender's name
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
