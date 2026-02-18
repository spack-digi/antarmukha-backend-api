"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllPost extends Model {
    static associate(models) {
      AllPost.hasMany(models.Post, {
        foreignKey: "postId",
        as: "posts",
      });
    }
  }
  AllPost.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AllPost",
      tableName: "AllPosts",
    },
  );
  return AllPost;
};
