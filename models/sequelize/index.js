const Movie = require("./Movie.js");
const Actor = require("./Actor.js");

module.exports = (sequelize) => {
  Movie.belongsToMany(Actor, { through: "movie_actors" });
  Actor.belongsToMany(Movie, { through: "movie_actors" });

  sequelize.sync({});
};
