import { expenses } from "../table/expenses.js";
import { passInfo } from "../table/pass.js";
import { User } from "../table/userTable.js";


User.hasMany(expenses, { foreignKey: 'userId' });
expenses.belongsTo(User, { foreignKey: 'userId' });


User.hasMany(passInfo, { foreignKey: "userId" });
passInfo.belongsTo(User, { foreignKey: "userId" });

// export { User, expenses, PassInfo };