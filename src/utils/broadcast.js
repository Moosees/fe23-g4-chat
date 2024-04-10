import ChannelService from "../service/channelService.js";

// Create broadcast channel if it doesn't exist
export const setupBroadcast = async () => {
	try {
		// Check if the broadcast channel already exists
		const broadcastChannelExists = await ChannelService.getChannelByName("broadcast");
		if (broadcastChannelExists) return console.log('Broadcast channel already exists');

		// If the broadcast channel doesn't exist, create it
		await ChannelService.createChannel("broadcast", "Broadcast Channel");
		console.log('Broadcast channel created');
	} catch (error) {
		console.error('Error creating broadcast channel:', error);
	}
};
