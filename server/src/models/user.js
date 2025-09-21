const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.Customer, {foreignKey: "userId", as: "customerUser"})
      this.hasOne(models.Admin, {foreignKey: "userId"})
    }
  }
  User.init({
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.ENUM(["customer", "admin"]),
    refreshToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};