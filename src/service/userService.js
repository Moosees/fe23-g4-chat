import User from '../model/userModel.js';

const registerUser = async (senderName, userName, passwordHash) => {
	return await User.create({ senderName, userName, passwordHash });
};

const getUserByUserName = async (userName) => {
	return await User.findOne({ userName }).select('userName senderName');
};

const getUserPasswordHash = async (userName) => {
	return await User.findOne({ userName }).select('passwordHash');
};

const UserService = { registerUser, getUserByUserName, getUserPasswordHash };

export default UserService;
