// import dotenv from "dotenv";
// dotenv.config();

// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   process.env.MYSQL_BD_NAME,
//   "root",
//   process.env.MYSQL_BD_PASS,
//   {
//     host: "localhost",
//     dialect: "mysql",
//   },
// );

// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

// export const db = sequelize;


import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

try {
  await sequelize.authenticate();
  console.log("Supabase database connected successfully.");
} catch (error) {
  console.error("Unable to connect to Supabase:", error);
}

export const db = sequelize;
