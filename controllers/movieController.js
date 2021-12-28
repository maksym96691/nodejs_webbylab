const Movie = require("../models/sequelize/Movie");
const MovieService = require("../services/movieService.js");

module.exports.insertMovie = async (req, res) => {
  console.log("111111111111", req.body);
  const movie = await MovieService.insert(req.body);

  res.send(movie);
};
