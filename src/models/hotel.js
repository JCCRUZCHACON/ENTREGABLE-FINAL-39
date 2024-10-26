'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hotel.belongsTo(models.city)
      hotel.hasMany(models.image)
      hotel.hasMany(models.booking)
      hotel.hasMany(models.review)
    }
  }
  hotel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lon: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'city',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'hotel',
  });
  return hotel;
};