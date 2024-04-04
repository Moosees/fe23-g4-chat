import ChannelService from "../service/channelService.js";
import MessageService from "../service/messageService.js";

const postMsgToChannel = async (req, res) => {
	const channelName = req.params.id;
	const { msg } = req.body;
	const userId = null; // until we have auth in place

	if (!msg) return res.status(400).send(); // empty message

	try {
		const channel = await ChannelService.getChannelByName(channelName);

		if (!channel) return res.status(404).send();
		// could be bad request, could be that channel is deleted

		await MessageService.addNewMessage(msg, userId, channel._id);

		res.status(200).send();
	} catch (error) {
		res.status(400).send();
	}
};

const MessageController = { postMsgToChannel };

export default MessageController;
