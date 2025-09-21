const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ZoneLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Zone, {foreignKey: "zoneId", as: "zone"})
      this.hasMany(models.DeliveryAddress, {foreignKey: "zoneLocationId", as: "deliveryZoneLocation"})
    }
  }
  ZoneLocation.init({
    address: DataTypes.STRING,
    zoneId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ZoneLocation',
  });
  return ZoneLocation;
};