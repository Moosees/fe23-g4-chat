import Channel from "../model/channelModel.js";

const createChannel = async (name, description) => {
	return await Channel.create({ name, description });
};

const ChannelService = { createChannel };

export default ChannelService;
