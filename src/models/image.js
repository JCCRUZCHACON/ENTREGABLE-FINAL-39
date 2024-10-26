'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      image.belongsTo(models.hotel)
    }
  }
  image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hotelId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hotel',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};