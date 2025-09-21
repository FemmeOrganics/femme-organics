'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.belongsTo(models.Admin, {foreignKey: "adminId"})
      this.hasMany(models.Billboard, {foreignKey: "storeId"})
      this.hasMany(models.Category, {foreignKey: "storeId"})
      this.hasMany(models.Product, {foreignKey: "storeId", as: "store"})
      this.hasMany(models.Brand, {foreignKey: "storeId"})
      this.hasOne(models.MpesaSetting, {foreignKey: "storeId", as: "mpesa"})
      this.hasOne(models.StripeSetting, {foreignKey: "storeId", as: "stripe"})
    }
  }
  Store.init({
    name: DataTypes.STRING,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};