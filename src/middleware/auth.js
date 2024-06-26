import UserService from "../service/userService.js";
import { verifyToken } from "../utils/jwt.js";

export const verifyUser = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		const { senderName } = req.body;

		res.locals.anonymous = true;
		res.locals.user = {
			senderName: senderName || 'Anonymous'
		};

		return next();
	}

	try {
		const token = authHeader.split(" ")[1];
		const { userName } = verifyToken(token);

		const user = await UserService.getUserByUserName(userName);
		if (!user) return res.status(400).json({ error: 'User not found' });

		res.locals.anonymous = false;
		res.locals.user = user;

		next();
	} catch (error) {
		res.status(500).send({ error: "Server error" });
	}
};

export const requiresLoggedIn = (req, res, next) => {
	if (res.locals.anonymous) {
		return res.status(401).json({ error: 'Please login in and try again' });
	}

	next();
};
