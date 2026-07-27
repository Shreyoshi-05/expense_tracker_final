import { giveRes } from "../err/err.js";
import { User } from "../table/userTable.js";

export const postUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return giveRes(req, res, 400, "all fileds needed", false);
    }

    const user = await User.create({ name, email, password });

    return giveRes(req, res, 200, "user had been added", user, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, false);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if(!user){
      return giveRes(req, res, 400, "email is not found",null,  false);
    }

    if(user.password !== password){
      return giveRes(req, res, 400, "password is not found",null, false);
    }

     return giveRes(req, res, 200, "user successfully loged in" ,null, true);

  } catch (error) {
    return giveRes(req, res, 500, error.message,null, false);
  }
};
