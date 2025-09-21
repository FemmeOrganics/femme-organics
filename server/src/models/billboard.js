'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Billboard extends Model {
    static associate(models) {
      this.belongsTo(models.Store, {foreignKey: "storeId"})
    }
  }
  Billboard.init({
    storeId: DataTypes.INTEGER,
    label: DataTypes.STRING,
    url: DataTypes.STRING,
    fileId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Billboard',
  });
  return Billboard;
};