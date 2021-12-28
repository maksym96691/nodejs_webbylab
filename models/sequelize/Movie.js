const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database");

class Movie extends Model {}

Movie.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    format: {
      type: DataTypes.ENUM({
        values: ["VHS", "DVD", "Blu-Ray"],
      }),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "movies",
  }
);
module.exports = Movie;
