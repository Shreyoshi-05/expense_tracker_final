import { where } from "sequelize";
import { giveRes } from "../err/err.js";
import { expenses } from "../table/expenses.js";

export const expenseController = async (req, res) => {
  try {
    const { type, userId, data } = req.body;
    console.log(data);

    const student = await expenses.create({
      title: data.title,
      date: data.date,
      amount: data.amount,
      category: data.category,
      notes: data.notes,
      type,
      userId,
    });

    return giveRes(req, res, 200, `${data.category} is added`, student, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const getExpense = async (req, res) => {
  // "income","expense"

  const { userId } = req.params;
  try {
    const exp = await expenses.findAll({ where: { type: "expense", userId } });
    let ee = 0;
    exp.forEach((expen) => (ee += expen.amount));

    return giveRes(req, res, 200, "got all expenses", ee, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const getIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const exp = await expenses.findAll({ where: { type: "income", userId } });
    let ee = 0;
    exp.forEach((expen) => (ee += expen.amount));

    return giveRes(req, res, 200, "got all income", ee, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const getAll = async (req, res) => {
  const { userId } = req.params;
  try {

    const exp = await expenses.findAll({ where: { type: "expense", userId } });
    let ee = 0;
    exp.forEach((expen) => (ee += expen.amount));

    const inc = await expenses.findAll({ where: { type: "income", userId } });
    let ii = 0;
    inc.forEach((expen) => (ii += expen.amount));

    let ans = ii - ee;

    return giveRes(req, res, 200, "got all income", ans, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const expenseAndIncome = async (req,res) => {
  try {
    const{userId} = req.params;
    const all = await expenses.findAll({where:{userId}});

    return giveRes(req, res, 200, "got all income and expenses", all, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
}
