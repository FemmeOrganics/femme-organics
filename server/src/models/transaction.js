const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {foreignKey: 'orderId', as: "transactions"})

    }
  }
  Transaction.init({
    orderId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    transactionCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};