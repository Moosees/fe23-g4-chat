import Message from "../model/messageModel.js";

// Function to add a new message to the database
const addNewMessage = async (body, senderName, author, channel) => {
	return await Message.create({ body, senderName, author, channel });
};

// Function to get messages from the database based on the channel ID
const getMessagesByChannelId = async (channel) => {
	return await Message.find({ channel }).populate('author');
};

// delete all messages sent in a specific channel
const deleteAllMessageInChannel = async (channelId) => {
	const result = await Message.deleteMany({ channelId });

	if (!result.acknowledged) throw new Error('something went wrong');
};

const MessageService = { addNewMessage, getMessagesByChannelId, deleteAllMessageInChannel };

export default MessageService;

