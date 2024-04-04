import ChannelService from "../service/channelService.js";

const createChannel = async (req, res) => {
	const { name, description } = req.body;

	try {
		await ChannelService.createChannel(name, description);
		res.status(201).send();
	} catch (error) {
		res.status(400).send(); // needs better error handling
	}
};

const getAllChannels = async (req, res) => {
	try {
		const channels = await ChannelService.getAllChannels();
		res.json(channels);
	} catch (error) {
		res.status(500).send();
	}
};

const ChannelController = { createChannel, getAllChannels };

export default ChannelController;
