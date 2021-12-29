const { DataTypes } = require("sequelize");
const Movie = require("./Movie.js");
const Actor = require("./Actor.js");

module.exports = (sequelize) => {
  Movie.belongsToMany(Actor, { through: "movie_actors" });
  console.log("I AM WOKRING!");
  Actor.belongsToMany(Movie, { through: "movie_actors" });

  sequelize.sync({});
};
