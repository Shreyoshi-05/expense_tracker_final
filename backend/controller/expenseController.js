import { where } from "sequelize";
import { giveRes } from "../err/err.js";
import { expenses } from "../table/expenses.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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
  const tt = await expenses.transaction();

  const { userId } = req.params;
  try {
    const exp = await expenses.findAll({ where: { type: "income", userId },tt });
    let ee = 0;
    exp.forEach((expen) => (ee += expen.amount));
    await tt.commit();
    return giveRes(req, res, 200, "got all income", ee, true);

  } catch (error) {
    
    await tt.rollback();
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

export const expenseAndIncome = async (req, res) => {
  try {
    const { userId } = req.params;
    const all = await expenses.findAll({ where: { userId } });

    return giveRes(req, res, 200, "got all income and expenses", all, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const askController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await expenses.findAll({ where: { userId: id } });

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: `
      You are a financial advisor.

      Analyze the following user transaction data and give insights.

      Data:
      ${JSON.stringify(data)}

      Give ONLY a short financial summary.

      Requirements:
      - Use Indian Rupee (₹), not dollars.
      - Do not use $, USD, or any other currency.
      - Keep the response under 100 words.
      - Do not use Markdown.
      - Do not use *, **, #, or ---.
      - Do not add unnecessary explanations or notes.
      - Do not mention test transactions.
      - Do not repeat the transaction data.
      - Give only the most important insights.

      Use exactly this format:

      Total Income: ₹amount
      Total Expenses: ₹amount
      Remaining: ₹amount

      Top Spending: category - ₹amount

      Reduce Spending: Give one short sentence about where the user should spend less.

      Saving Tip: Give one short practical saving tip.
      `,
    });
    const response = interaction.output_text;

    const cleanResponse = response.replace(/\\n+/g, "");
    return giveRes(req, res, 200, "got ans", cleanResponse, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const deleteExp = async(req,res) => {
  try {
    const {id} = req.params;
    const exp = await expenses.findByPk(id);

    if (!exp) {
      return giveRes(
        req,
        res,
        404,
        "Expense not found",
        null,
        false
      );
    }

    await exp.destroy();
    return giveRes(req, res, 200, "deleted this expenses", null, true);

  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
}