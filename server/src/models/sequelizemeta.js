'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SequelizeMeta extends Model {
    static associate(models) {
      // define association here
    }
  }
  SequelizeMeta.init({
    // name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SequelizeMeta',
  });
  return SequelizeMeta;
};