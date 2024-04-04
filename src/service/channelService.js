import Channel from "../model/channelModel.js";

const createChannel = async (name, description) => {
	return await Channel.create({ name, description });
};

const getAllChannels = async () => {
	return await Channel.find({});
};

const getChannelByName = async (name) => {
	return await Channel.findOne({ name });
};

const ChannelService = { createChannel, getAllChannels, getChannelByName };

export default ChannelService;
