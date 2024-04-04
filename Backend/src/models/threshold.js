'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Threshold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Threshold.belongsTo(models.Garden)
    }
  }
  Threshold.init({
    sensorType: DataTypes.STRING,
    unit: DataTypes.STRING,
    value: DataTypes.STRING,
    isUpperBound: DataTypes.BOOLEAN,
    gardenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Threshold',
  });
  return Threshold;
};