const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId", as: "store"})
      this.belongsTo(models.Category, {foreignKey: "categoryId",  as: "category"})
      this.hasMany(models.Image, {foreignKey: "productId", as: "images"})

      this.hasMany(models.Color, {foreignKey: "productId", as: "colors"})
      this.hasMany(models.Size, {foreignKey: "productId", as: "sizes"})
      this.hasMany(models.OrderItem, {foreignKey: "productId", as: 'orderProduct'})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    isFeatured: DataTypes.BOOLEAN,
    isArchived: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    specification: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};