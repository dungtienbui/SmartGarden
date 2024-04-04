'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeasuredValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MeasuredValue.belongsTo(models.Sensor)
    }
  }
  MeasuredValue.init({
    timestamp: DataTypes.DATE,
    sensorId: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    isOutThreshold: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MeasuredValue',
  });
  return MeasuredValue;
};