const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Store, {foreignKey: "adminId"})
      this.belongsTo(models.User, {foreignKey: "userId"})
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};