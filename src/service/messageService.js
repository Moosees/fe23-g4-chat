// Importing the Message model from its location
import Channel from "../model/channelModel.js";
import Message from "../model/messageModel.js";

// Function to add a new message to the database
// - changed to work with Broadcast channel
const addNewMessage = async (body, senderName, userId, channelId) => {
	return await Message.create({ body, senderName, userId, channelId });
};

// Function to get messages from the database based on the channel ID
// - basic get-function added
const getMessagesByChannelId = async (channelId) => {
	return await Message.find({ channelId });
};

const deleteAllMessageInChannel = async (channelId, userId) => {

	const channel = await Channel.findById(channelId);
	if (!channel || channel.owner !== userId) {
		throw new Error('User is not authorized to delete messages in this channel');
	}

	const result = await Message.deleteMany({ channelId });

	if (!result.acknowledged) throw new Error('something went wrong');
};

const MessageService = { addNewMessage, getMessagesByChannelId, deleteAllMessageInChannel };

export default MessageService;

