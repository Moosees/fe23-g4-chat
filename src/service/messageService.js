import Message from "../model/messageModel.js";

const addNewMessage = async (body, userId, channelId) => {
	return await Message.create({ body, userId, channelId });
};

const MessageService = { addNewMessage };

export default MessageService;
