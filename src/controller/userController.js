import bcrypt from "bcrypt";
import UserService from "../service/userService.js";
import { createToken } from "../utils/jwt.js";

const registerUser = async (req, res) => {
	const { name, userName, password } = req.body;

	try {
		const user = await UserService.getUserByUserName(userName);
		if (user) return res.status(400).json({ error: 'Username is taken, please select another one' });

		const passwordHash = await bcrypt.hash(password, 10);
		await UserService.registerUser(name, userName, passwordHash);

		res.status(201).send({ token: createToken(userName) });
	} catch (error) {
		if (error.code === 11000) return res.status(400).send({ error: "Username is taken, please select another one" });
		res.status(500).json({ error: "Something broke" });
	}
};

const loginUser = async (req, res) => {
	const { userName, password } = req.body;

	try {
		const user = await UserService.getUserByUserName(userName);

		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		const passwordMatch = await bcrypt.compare(password, user.passwordHash);

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		res.status(200).json({ message: "Login successful", token: createToken(userName) });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ error: "Something broke" });
	}
};

const UserController = { registerUser, loginUser };

export default UserController;
