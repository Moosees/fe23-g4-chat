import { validationResult } from "express-validator";
import xss from 'xss';
import sanitizeHtml from 'sanitize-html';
import ChannelService from "../service/channelService.js";
import MessageService from "../service/messageService.js";

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
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const channelName = req.params.id;
	const { msg, senderName } = req.body;
	const userId = null; // until we have auth in place

	if (!msg) return res.status(400).send(); // empty message

	try {
		const channel = await ChannelService.getChannelByName(channelName);

		if (!channel) return res.status(404).send();

		// XSS protection using xss library
		const sanitizedMsg = xss(msg);
		const sanitizedSenderName = xss(senderName);

		// Prevent HTML tags from being rendered using sanitize-html
		const cleanedMsg = sanitizeHtml(sanitizedMsg, htmlSanitizeOptions);
		const cleanedSenderName = sanitizeHtml(sanitizedSenderName, htmlSanitizeOptions);

		// If channel is 'broadcast' and senderName is provided, add message with senderName
		if (channelName === 'broadcast' && senderName) {
			await MessageService.addNewMessage(cleanedMsg, cleanedSenderName, userId, channel._id);
		} else {
			// If senderName is not provided, return 400 error
			if (!senderName) return res.status(400).send({ error: "Name is required" });
			await MessageService.addNewMessage(cleanedMsg, cleanedSenderName, userId, channel._id);
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

		// Sanitize messages to prevent XSS and HTML injection
		const sanitizedMessages = messages.map(message => ({
			body: sanitizeHtml(xss(message.body), htmlSanitizeOptions),
			senderName: sanitizeHtml(xss(message.senderName), htmlSanitizeOptions),
			sentAt: message.sentAt
		}));

		// Sending retrieved messages as JSON response
		res.json(sanitizedMessages);
	} catch (error) {
		// Handling errors and sending 500 error
		console.error("Error retrieving broadcast messages:", error);
		res.status(500).send({ error: "Server error" });
	}
};

// Controller function to post a message to the broadcast channel
const postMsgToBroadcast = async (req, res) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { msg, senderName } = req.body;
	const userId = null; // until we have auth in place

	// Checking if message is empty
	if (!msg) return res.status(400).send({ error: "Message content is required" });

	try {
		// Retrieving broadcast channel
		const broadcastChannel = await ChannelService.getChannelByName('broadcast');

		// If broadcast channel doesn't exist, return 404 error
		if (!broadcastChannel) return res.status(404).send({ error: "Broadcast channel not found" });

		// XSS protection using xss library
		const sanitizedMsg = xss(msg);
		const sanitizedSenderName = xss(senderName || "Anonymous");

		// Prevent HTML tags from being rendered using sanitize-html
		const cleanedMsg = sanitizeHtml(sanitizedMsg, {
			allowedTags: [], // Disallow all tags
			allowedAttributes: {} // Disallow all attributes
		});
		const cleanedSenderName = sanitizeHtml(sanitizedSenderName);

		await MessageService.addNewMessage(cleanedMsg, cleanedSenderName, userId, broadcastChannel._id);

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

		res.json(sanitizedMessages);
	} catch (error) {
		console.error("Error retrieving messages by channel:", error);
		res.status(500).send({ error: "Server error" });
	}
};

// Object containing all message controller functions
const MessageController = { postMsgToChannel, getBroadcastMessages, postMsgToBroadcast, getMessagesByChannel };

// Exporting message controller object
export default MessageController;
