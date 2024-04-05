import { Router } from "express";
import UserController from "../controller/userController.js";

const userRoutes = Router();

userRoutes.post("/register", UserController.registerUser);
userRoutes.post("/login", UserController.loginUser);

export default userRoutes;
