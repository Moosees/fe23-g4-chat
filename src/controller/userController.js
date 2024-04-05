import UserService from "../service/userService.js";

const registerUser = async (req, res) => {
	const { name, userName, passwordHash } = req.body;

	try {
		await UserService.registerUser(name, userName, passwordHash);
		res.status(201).send();
	} catch (error) {
		if (error.code === 11000) return res.status(400).send({ error: "Username already exists" });
		res.status(500).json({ error: "Something broke" });
	}
};

const loginUser = async (req, res) => {
	const { userName, passwordHash } = req.body;

	try {
		const user = await UserService.loginUser(userName, passwordHash);
		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		res.status(200).json({ message: "Login successful", user });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ error: "Something broke" });
	}
};

const UserController = { registerUser, loginUser };

export default UserController;
