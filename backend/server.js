import express from "express";
import { userRouter } from "./router/userRouter.js";
import { db } from "./db/db.js";
import { User } from "./table/userTable.js";
import { expenses } from "./table/expenses.js";
import cors from "cors";
import { expenseRouter } from "./router/expenseRouter.js";
import { paymentRouter } from "./router/paymentRoutes.js";
import dotenv from "dotenv";
import './db/index.js'
import { passInfo } from "./table/pass.js";
import { forgotPass } from "./controller/user.js";
import { forgetPassRouter } from "./router/forgetPassRouter.js";


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(userRouter);
app.use(expenseRouter);
app.use(paymentRouter);
app.use("/password",forgetPassRouter);
dotenv.config();


const port = 3000;

db.sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.meaage);
  });
