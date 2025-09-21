const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryAddress extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {foreignKey: "customerId"})
      this.hasMany(models.Order, {foreignKey: "deliveryAddressId", as: "deliveryAddress" })
      this.belongsTo(models.ZoneLocation, {foreignKey: "zoneLocationId", as: "deliveryZoneLocation"})
      this.belongsTo(models.PickupMtaani, {foreignKey: "pickupMtaaniId", as: "deliveryPickupMtaani"})
    }
  }
  DeliveryAddress.init({
    customerId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    name: DataTypes.STRING,

    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    locationId: DataTypes.STRING,
    deliveryFee: DataTypes.STRING,

    zoneLocationId: DataTypes.INTEGER,
    pickupMtaaniId: DataTypes.INTEGER,
    type: DataTypes.ENUM(["CUSTOM", "PICKUP_MTAANI", "PICK_AND_DROP"])
  }, {
    sequelize,
    modelName: 'DeliveryAddress',
  });
  return DeliveryAddress;
};