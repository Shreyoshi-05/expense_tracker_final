
import express from "express";
import { forgetPassController, getResetForm, resetPassWord } from "../controller/forgetPassController.js";

export const forgetPassRouter = express.Router();

forgetPassRouter.post("/forgot",forgetPassController);
forgetPassRouter.get("/resetPassword/:token",getResetForm);
forgetPassRouter.post("/reset",resetPassWord);

