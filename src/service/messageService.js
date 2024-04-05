// Importing the Message model from its location
import Message from "../model/messageModel.js";

// Function to add a new message to the database
// - changed to work with Broadcast channel
const addNewMessage = async (body, senderName, userId, channelId) => {
    return await Message.create({ body, senderName, userId, channelId });
};

// Function to get messages from the database based on the channel ID
// - basic get-function added
async function getMessagesByChannelId(channelId) {
	return await Message.find({ channelId });
}


const MessageService = { addNewMessage, getMessagesByChannelId };


export default MessageService;
