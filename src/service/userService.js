import User from '../model/userModel.js';

const registerUser = async (senderName, userName, passwordHash) => {
	return await User.create({ senderName, userName, passwordHash });
};

const getUserByUserName = async (userName) => {
	return await User.findOne({ userName });
};

const UserService = { registerUser, getUserByUserName, };

export default UserService;
