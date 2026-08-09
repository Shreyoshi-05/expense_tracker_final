import express from "express";
import { expenseAndIncome, expenseController, getAll, getExpense, getIncome } from "../controller/expenseController.js";

export const expenseRouter = express.Router();

expenseRouter.post("/expense",expenseController);
expenseRouter.get("/all/expense/:userId",getExpense);
expenseRouter.get("/all/income/:userId",getIncome);
expenseRouter.get("/summery/:userId",getAll);
expenseRouter.get("/allList/:userId",expenseAndIncome);