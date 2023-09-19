'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId',
          as: 'previewImage'
        },

      )
    }
  }
  SpotImage.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
