import UserService from "../service/userService.js";
import { verifyToken } from "../utils/jwt.js";

export const verifyUser = async (req, res, next) => {
	const { token } = req.body;

	if (!token) {
		// anonymous user stuff goes here
		res.locals.anonymous = true;
		res.locals.user = {};

		return next();
	}

	try {
		const { userName } = verifyToken(token);

		const user = await UserService.getUserByUserName(userName);

		if (!user) return res.status(400).json({ error: 'User not found' });
		console.log(user);
		res.locals.anonymous = false;
		res.locals.user = user;

		next();
	} catch (error) {
		res.status(500).send();
	}

};
