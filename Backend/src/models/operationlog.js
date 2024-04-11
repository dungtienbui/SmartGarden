'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OperationLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OperationLog.belongsTo(models.Device)
    }
  }
  OperationLog.init({
    timestamp: DataTypes.DATE,
    DeviceId: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN,
    operatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OperationLog',
  });
  return OperationLog;
};