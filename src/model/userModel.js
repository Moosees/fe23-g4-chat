import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	name: String,
	userName: String,
	passwordHash: String,
	created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
