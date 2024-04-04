'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sensor.belongsTo(models.Garden)
      Sensor.hasMany(models.MeasuredValue)
    }
  }
  Sensor.init({
    name: DataTypes.STRING,
    sensorType: DataTypes.STRING,
    unit: DataTypes.STRING,
    description: DataTypes.BOOLEAN,
    gardenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};