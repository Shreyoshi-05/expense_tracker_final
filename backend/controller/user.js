import { giveRes } from "../err/err.js";
import { User } from "../table/userTable.js";

export const postUserController = async(req,res) =>{
  try {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return giveRes(req,res,400,"all fileds needed")
    }

    const user = await User.create({name,email,password});

    return giveRes(req,res,200,"user had been added",user);
    
  } catch (error) {
    return giveRes(req,res,500,error.message);
  }
}