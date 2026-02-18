"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.AllPost, {
        foreignKey: "postId",
        as: "program",
      });

      Booking.belongsTo(models.Post, {
        foreignKey: "dateId",
        as: "schedule",
      });
    }
  }
  Booking.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      postId: DataTypes.INTEGER,
      dateId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    },
  );
  return Booking;
};
