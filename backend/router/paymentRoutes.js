import express from "express";
import { processPayment } from "../controller/paymentControllers.js";

export const paymentRouter = express.Router();

paymentRouter.post("/create-order",processPayment);

