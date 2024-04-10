import User from '../model/userModel.js';

const registerUser = async (name, userName, passwordHash) => {
	return await User.create({ name, userName, passwordHash });
};

const getUserByUserName = async (userName) => {
	return await User.findOne({ userName });
};

const UserService = { registerUser, getUserByUserName, };

export default UserService;
