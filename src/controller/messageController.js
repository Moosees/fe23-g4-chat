import ChannelService from "../service/channelService.js";
import MessageService from "../service/messageService.js";


// Controller function to post a message to a specific channel
const postMsgToChannel = async (req, res) => {
	const channelName = req.params.id;
	const { msg, senderName } = req.body;
	const userId = null; // until we have auth in place

	if (!msg) return res.status(400).send(); // empty message

	try {
		const channel = await ChannelService.getChannelByName(channelName);

		if (!channel) return res.status(404).send();
		// could be bad request, could be that channel is deleted

		// If channel is 'broadcast' and senderName is provided, add message with senderName
		if (channelName === 'broadcast' && senderName) {
			await MessageService.addNewMessage(msg, senderName, userId, channel._id);
		} else {
			// If senderName is not provided, return 400 error
			if (!senderName) return res.status(400).send({ error: "Name is required" });
			await MessageService.addNewMessage(msg, senderName, userId, channel._id);
		}

		res.status(200).send();
	} catch (error) {
		res.status(400).send();
	}
};

// Controller function to get messages from the broadcast channel
const getBroadcastMessages = async (req, res) => {
	try {
		// Retrieving broadcast channel
		const broadcastChannel = await ChannelService.getChannelByName('broadcast');

		// If broadcast channel doesn't exist, return 404 error
		if (!broadcastChannel) {
			return res.status(404).send({ error: "Broadcast channel not found" });
		}

		// Retrieving messages from broadcast channel
		const messages = await MessageService.getMessagesByChannelId(broadcastChannel._id);
		// Sending retrieved messages as JSON response
		res.json(messages);
	} catch (error) {
		// Handling errors and sending 500 error
		console.error("Error retrieving broadcast messages:", error);
		res.status(500).send({ error: "Server error" });
	}
};


// Controller function to post a message to the broadcast channel
const postMsgToBroadcast = async (req, res) => {
	const { msg, senderName } = req.body;
	const userId = null; // until we have auth in place

	// Checking if message is empty
	if (!msg) return res.status(400).send({ error: "Message content is required" });

	try {
		// Retrieving broadcast channel
		const broadcastChannel = await ChannelService.getChannelByName('broadcast');

		// If broadcast channel doesn't exist, return 404 error
		if (!broadcastChannel) return res.status(404).send({ error: "Broadcast channel not found" });

		// Adding new message to the broadcast channel
		await MessageService.addNewMessage(msg, senderName || "Anonymous", userId, broadcastChannel._id);
		// Sending success response
		res.status(201).send();
	} catch (error) {
		// Handling errors and sending 500 error
		res.status(500).send({ error: "Server error" });
	}
};

// Controller function to get messages from a specific channel
const getMessagesByChannel = async (req, res) => {
	const channelName = req.params.name;

	// Check if channelName is provided
	if (!channelName) {
		return res.status(400).send({ error: "Channel name is required" });
	}

	try {
		// Retrieve channel by name
		const channel = await ChannelService.getChannelByName(channelName);

		// Check if channel exists
		if (!channel || !channel._id) {
			return res.status(404).send({ error: "Channel not found or invalid" });
		}

		// Retrieve messages by channel ID
		const messages = await MessageService.getMessagesByChannelId(channel._id);

		// Check if messages array is empty
		if (messages.length === 0) {
			const errorMessage = `No messages found in this channel, be the first to post to the ${channelName} channel to see it here`;
			//return res.json({ message: errorMessage });
			return res.status(200).json({ message: errorMessage });
		}

		res.json(messages);
	} catch (error) {
		console.error("Error retrieving messages by channel:", error);
		res.status(500).send({ error: "Server error" });
	}
};

// Object containing all message controller functions
const MessageController = { postMsgToChannel, getBroadcastMessages, postMsgToBroadcast, getMessagesByChannel };

// Exporting message controller object
export default MessageController;
