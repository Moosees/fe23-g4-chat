export const setDefaultChannel = (req, res, next) => {
	res.locals.channelName = req.params.channelName || 'broadcast';

	next();
};
