import express from "express";
import { loginUserController, postUserController } from "../controller/user.js";

export const userRouter = express();

userRouter.post("/user", postUserController);
userRouter.post("/userlogin", loginUserController);