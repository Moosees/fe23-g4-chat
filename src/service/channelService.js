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

const deleteChannelById = async (id) => {
	const { acknowledged, deletedCount } = await Channel.deleteOne({ _id: id });

	if (!acknowledged || deletedCount === 0) throw new Error('Could not delete channel');
};

const ChannelService = { createChannel, getAllChannels, getChannelByName, deleteChannelById };

export default ChannelService;
