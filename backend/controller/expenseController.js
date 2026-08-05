import { giveRes } from "../err/err.js";
import { expenses } from "../table/expenses.js";

export const expenseController = async (req, res) => {
  try {
    const { type, userId, data } = req.body;
    console.log( data);

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
