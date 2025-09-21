'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: "productId", as: "sizes"})
    }
  }
  Size.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};