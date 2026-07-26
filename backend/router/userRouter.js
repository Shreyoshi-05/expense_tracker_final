import express from "express";
import { postUserController } from "../controller/user.js";

export const userRouter = express();

userRouter.post("/user", postUserController)