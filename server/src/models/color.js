'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: "productId", as: "colors"})
    }
  }
  Color.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};