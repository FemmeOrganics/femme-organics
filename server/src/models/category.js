"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, { foreignKey: "storeId" });
      this.hasMany(models.Product, { foreignKey: "categoryId", as: "category" });
    }
  }
  Category.init(
    {
      storeId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
