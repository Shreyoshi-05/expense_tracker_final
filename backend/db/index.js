import { expenses } from "../table/expenses.js";
import { User } from "../table/userTable.js";


User.hasMany(expenses, { foreignKey: 'userId' });
expenses.belongsTo(User, { foreignKey: 'userId' });