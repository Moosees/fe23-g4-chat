import jwt from "jsonwebtoken";

export const createToken = (userName) => {
	return jwt.sign({ userName }, process.env.JWTSECRET, {
		issuer: 'fe23g4chat',
		expiresIn: process.env.NODE_ENV === 'production' ? '15m' : '4h'
	});
};

export const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWTSECRET);
};
