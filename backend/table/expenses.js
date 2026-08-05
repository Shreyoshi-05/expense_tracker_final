import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../db/db.js';


export const expenses = db.define(
  'expenses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    date:{
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    amount:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    category:{
      type:DataTypes.STRING
    },
    notes:{
      type:DataTypes.STRING
    },
    type:{
      type: DataTypes.ENUM("income","expense"),
      allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }
);