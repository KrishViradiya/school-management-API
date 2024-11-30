const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

class School extends Model {}

School.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'School',
    tableName: 'schools',
    timestamps: true
  }
);

module.exports = School;