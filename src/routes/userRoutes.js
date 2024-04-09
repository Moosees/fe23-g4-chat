import { Router } from "express";
import UserController from "../controller/userController.js";

const userRoutes = Router();

// register new user - body: { name, userName, password }
userRoutes.post("/register", UserController.registerUser);
// log user in - body: { userName, password }
userRoutes.post("/login", UserController.loginUser);

export default userRoutes;
