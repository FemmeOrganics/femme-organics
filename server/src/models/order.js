const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.OrderItem, {foreignKey: 'orderId', as: "orderItems"})
      this.hasMany(models.Transaction, {foreignKey: 'orderId', as: "transactions"})
      this.belongsTo(models.Customer, {foreignKey: "customerId", as: "customerOrder"})
      this.belongsTo(models.DeliveryAddress, {foreignKey: "deliveryAddressId", as: "deliveryAddress"})
    }
  }
  Order.init({
    orderNumber: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    status: DataTypes.ENUM(["CONFIRMED", "PENDING", "RECEIVED", "CANCELLED"]),
    paymentStatus: DataTypes.ENUM(["FULL", "PARTIAL", "NOT_PAID"]),
    type: DataTypes.ENUM(["selfCollect", "delivery"]),
    customerId: DataTypes.INTEGER,
    deliveryAddressId: DataTypes.INTEGER,
    orderAmount: DataTypes.DECIMAL,
    amountPaid: DataTypes.DECIMAL,
    deliveryAmount: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};