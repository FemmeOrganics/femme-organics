'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PickupMtaani extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.DeliveryAddress, {foreignKey: "pickupMtaaniId", as: "deliveryPickupMtaani"})

    }
  }
  PickupMtaani.init({
    locationName: DataTypes.STRING,
    agentName: DataTypes.STRING,
    deliveryFee: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'PickupMtaani',
  });
  return PickupMtaani;
};