import dotenv from "dotenv";
dotenv.config();
import compression from 'compression';
import morgan from 'morgan';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import { userRouter } from "./router/userRouter.js";
import { db } from "./db/db.js";
import { User } from "./table/userTable.js";
import { expenses } from "./table/expenses.js";
import cors from "cors";
import { expenseRouter } from "./router/expenseRouter.js";
import { paymentRouter } from "./router/paymentRoutes.js";

import './db/index.js'
import { passInfo } from "./table/pass.js";
import { forgotPass } from "./controller/user.js";
import { forgetPassRouter } from "./router/forgetPassRouter.js";
import helmet from "helmet";


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined",{stream: accessLogStream}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(userRouter);
app.use(expenseRouter);
app.use(paymentRouter);
app.use("/password",forgetPassRouter);



const port = process.env.PORT||3000;

db.sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.meaage);
  });
