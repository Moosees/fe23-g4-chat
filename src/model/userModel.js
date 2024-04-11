import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	senderName: { type: String, trim: true, default: 'Unnamed user' },
	userName: { type: String, trim: true, lowercase: true, unique: true },
	passwordHash: String,
	created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
