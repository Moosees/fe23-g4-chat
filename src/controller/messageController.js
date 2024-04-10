import sanitizeHtml from 'sanitize-html';
import xss from 'xss';
import ChannelService from "../service/channelService.js";
import MessageService from "../service/messageService.js";
import { getIo } from "../utils/socket.js";

// Configuration for sanitize-html to disallow formatting tags
const htmlSanitizeOptions = {
	allowedTags: [], // Disallow all tags
	allowedAttributes: {}, // Disallow all attributes
	exclusiveFilter: (frame) => {
		return frame.tag === 'strong' || frame.tag === 'em' || frame.tag === 'u'; // Allow only specific formatting tags
	}
};

// Controller function to post a message to a specific channel
const postMsgToChannel = async (req, res) => {
	console.log(req.body, res.locals)
	const { msg } = req.body;
	if (!msg) return res.status(400).json({ error: 'Message cannot be empty' }); // empty message

	const { userId, senderName } = res.locals.user;
	const { channelName } = res.locals;

	try {
		const channel = await ChannelService.getChannelByName(channelName);

		if (!channel) return res.status(404).send();

		// XSS protection using xss library
		const sanitizedMsg = xss(msg);
		const sanitizedSenderName = xss(senderName);

		// Prevent HTML tags from being rendered using sanitize-html
		const cleanedMsg = sanitizeHtml(sanitizedMsg, htmlSanitizeOptions);
		const cleanedSenderName = sanitizeHtml(sanitizedSenderName, htmlSanitizeOptions);

		// If senderName is not provided, return 400 error
		if (!senderName) return res.status(400).send({ error: "Name is required" });
		const dbRes = await MessageService.addNewMessage(cleanedMsg, cleanedSenderName, userId, channel._id);

		// send message to all clients chat history
		getIo().emit('message', { senderName: dbRes.senderName, body: dbRes.body, sentAt: dbRes.sentAt });

		res.status(200).send();
	} catch (error) {
		res.status(400).send();
	}
};

// Controller function to get messages from a specific channel
const getMessagesByChannel = async (req, res) => {
	const { channelName } = res.locals;
	// xss through channelName?

	try {
		// Retrieve channel by name
		const channel = await ChannelService.getChannelByName(channelName);
		console.log(channel);

		// Check if channel exists
		if (!channel || !channel._id) {
			return res.status(404).send({ error: "Channel not found or invalid" });
		}

		// Retrieve messages by channel ID
		const messages = await MessageService.getMessagesByChannelId(channel._id);

		// Sanitize messages to prevent XSS and HTML injection
		const sanitizedMessages = messages.map(message => ({
			body: sanitizeHtml(xss(message.body), htmlSanitizeOptions),
			senderName: sanitizeHtml(xss(message.senderName), htmlSanitizeOptions),
			sentAt: message.sentAt
		}));

		// Check if messages array is empty
		if (messages.length === 0) {
			const errorMessage = `No messages found in this channel, be the first to post to the ${channelName} channel to see it here`;
			return res.status(200).json({ message: errorMessage });
		}

		res.status(200).json(sanitizedMessages);
	} catch (error) {
		console.error("Error retrieving messages by channel:", error);
		res.status(500).send({ error: "Server error" });
	}
};

// Object containing all message controller functions
const MessageController = { postMsgToChannel, getMessagesByChannel };

// Exporting message controller object
export default MessageController;
