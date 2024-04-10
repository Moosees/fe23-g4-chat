import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	senderName: String,
	userName: { type: String, unique: true },
	passwordHash: String,
	created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
