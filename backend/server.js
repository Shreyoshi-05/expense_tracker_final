import express from "express";
import { userRouter } from "./router/userRouter.js";
import { db } from "./db/db.js";
import { User } from "./table/userTable.js";
import { expenses } from "./table/expenses.js";
import cors from "cors";
import { expenseRouter } from "./router/expenseRouter.js";


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(userRouter);
app.use(expenseRouter);


const port = 3000;

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.meaage);
  });
