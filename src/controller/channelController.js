import ChannelService from "../service/channelService.js";
import MessageService from "../service/messageService.js";
import xss from 'xss';
import sanitizeHtml from 'sanitize-html';

const createChannel = async (req, res) => {
	const { name, description } = req.body;
	const ownerId = res.locals.user._id;

	// Sanitize input to prevent XSS attacks
	const sanitizedName = xss(name);
	const sanitizedDescription = sanitizeHtml(description);

	try {
		await ChannelService.createChannel(sanitizedName, sanitizedDescription, ownerId);
		res.status(201).send();
	} catch (error) {
		if (error.code === 11000) return res.status(400).send({ error: "Channel already exists" });
		res.status(500).json({ error: "Something broke" });
	}
};

const getAllChannels = async (req, res) => {
	try {
		const channels = await ChannelService.getAllChannels();

		// Sanitize channel data to prevent XSS attacks
		const sanitizedChannels = channels.map(channel => ({
			name: xss(channel.name),
			description: sanitizeHtml(channel.description)
		}));

		res.json(sanitizedChannels);
	} catch (error) {
		res.status(500).send();
	}
};

const deleteChannel = async (req, res) => {
	const { channelName } = res.locals
	const userId = res.locals.user._id;

	// Add better safety for broadcast channel
	if (channelName.length < 4 || channelName === 'broadcast') return res.status(400).send();

	try {
		const channel = await ChannelService.getChannelByName(channelName);

		if (!channel) return res.status(404).json({ error: 'Channel not found' });

		if (!channel.owner.equals(userId)) return res.status(403).json({ error: "You are not authorized to delete this channel" });

		// use transaction? https://www.mongodb.com/docs/manual/core/transactions/
		await ChannelService.deleteChannelById(channel._id);
		await MessageService.deleteAllMessageInChannel(channel._id);

		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
};

const ChannelController = { createChannel, getAllChannels, deleteChannel };

export default ChannelController;
