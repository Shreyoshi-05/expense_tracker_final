import { Sequelize } from "sequelize";
import { giveRes } from "../err/err.js";
import { expenses } from "../table/expenses.js";
import { User } from "../table/userTable.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { passInfo } from "../table/pass.js";

export const postUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return giveRes(req, res, 400, "all fileds needed", false);
    }

    const hashpass = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashpass });

    return giveRes(req, res, 200, "user had been added", user, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, false);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return giveRes(req, res, 400, "email is not found", null, false);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return giveRes(req, res, 400, "incorrect password", null, false);
    }

    return giveRes(req, res, 200, "user successfully loged in", user, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const getLeaderBoard = async (req, res) => {
  try {
    // const allUser = await User.findAll({attributes:["id"]});
    // const allExpenses = await expenses.findAll({attributes:["type","userId","amount"]});

    // let ans = [];

    // let all = allUser.data;

    // for(let ss of allUser){
    //   let inc = await expenses.findAll({where:{userId:ss.id,type:"income"}});
    //   let exp = await expenses.findAll({where:{userId:ss.id,type:"expense"}});

    //   const ttinc = inc.reduce((sum , item) => sum + item.amount,0);
    //   const ttexp = exp.reduce((sum , item) => sum + item.amount,0);

    //   const saveings = ttinc - ttexp;

    //   ans.push({
    //     name: ss.name,
    //     saveings
    //   })
    // }
    // ans.sort((a,b) =>  b.saveings -a.saveings );

    const result = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          Sequelize.literal(`sum(
        case 
        when expenses.type = "income" then expenses.amount
        when expenses.type = "expense" then - expenses.amount
        else 0
        end
        )`),
          "saveings",
        ],
      ],
      include: [
        {
          model: expenses,
          attributes: [],
        },
      ],
      group: ["User.id", "User.name"],
      order: [[Sequelize.literal("saveings"), "desc"]],
    });

    return giveRes(req, res, 200, "got all user data", result, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const forgotPass = async (req, res) => {
  try {
    const token = uuidv4();

    const pass = await passInfo.create({
      id: token,
      userId: user.id,
      isActive: true,
    });
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};
