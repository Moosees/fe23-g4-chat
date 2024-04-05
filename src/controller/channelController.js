import ChannelService from "../service/channelService.js";

const createChannel = async (req, res) => {
	const { name, description } = req.body;

	try {
		await ChannelService.createChannel(name, description);

		res.status(201).send();
	} catch (error) {
		if (error.code === 11000) return res.status(400).send({ error: "Channel already exists" });

		res.status(500).json({ error: "Something broke" }); // needs better error handling
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
