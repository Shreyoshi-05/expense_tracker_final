import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../db/db.js';

export const User = db.define(
  'User',
  {
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);