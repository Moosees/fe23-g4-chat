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

const ChannelController = { createChannel };

export default ChannelController;
