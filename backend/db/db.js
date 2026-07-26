import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pr_new', 'root', 'shreayoshi123', {
  host: 'localhost',
  dialect: 'mysql'
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const db = sequelize;