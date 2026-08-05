import express from "express";
import { expenseController } from "../controller/expenseController.js";

export const expenseRouter = express.Router();

expenseRouter.post("/expense",expenseController);