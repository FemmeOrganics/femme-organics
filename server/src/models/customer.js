const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      this.hasMany(models.Order,  {foreignKey: "customerId", as: "customerOrder"})
      this.belongsTo(models.User,  { foreignKey: "userId",  as: "customerUser"})
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};