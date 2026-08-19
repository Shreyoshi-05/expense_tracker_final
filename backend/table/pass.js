import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../db/db.js';

export const passInfo = db.define(
  'passInfo',
  {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expiresAt:{
      type: DataTypes.DATE,
      allowNull:false
    }
  },
);