import Channel from "../model/channelModel.js";

const createChannel = async (name, description) => {
	return await Channel.create({ name, description });
};

const getAllChannels = async () => {
	return await Channel.find({});
};

const ChannelService = { createChannel, getAllChannels };

export default ChannelService;
