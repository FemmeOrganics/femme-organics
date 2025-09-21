'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ZoneLocation, {foreignKey: "zoneId", as: "locations"})
    }
  }
  Zone.init({
    name: DataTypes.STRING,
    standardTime: DataTypes.STRING,
    standardPrice: DataTypes.DECIMAL,
    expressPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Zone',
  });
  return Zone;
};