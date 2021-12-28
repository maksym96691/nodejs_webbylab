const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database");

class Actor extends Model {}

Actor.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "actors",
  }
);

module.exports = Actor;
