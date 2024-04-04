import Channel from "../model/channelModel.js";

const createChannel = async (name, description) => {
	return await Channel.create({ name, description });
};

const getChannelByName = async (name) => {
	return await Channel.findOne({ name });
};

const ChannelService = { createChannel, getChannelByName };

export default ChannelService;
