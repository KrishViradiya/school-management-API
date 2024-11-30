const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

class School extends Model {
  static associate(models) {
    // associations
  }
}

School.init({
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
}, {
  sequelize,
  modelName: 'School',
  timestamps: true // This will keep createdAt and updatedAt
});

module.exports = School;