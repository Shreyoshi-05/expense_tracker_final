import express from "express";
import { userRouter } from "./router/userRouter.js";
import { db } from "./db/db.js";
import { User } from "./table/userTable.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(userRouter);

const port = 3000;

db.sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.meaage);
  });
