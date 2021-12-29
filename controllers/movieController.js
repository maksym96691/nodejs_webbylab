const Movie = require("../models/sequelize/Movie");
const MovieService = require("../services/movieService.js");

module.exports.insertMovie = async (req, res) => {
  console.log("111111111111", req.body);
  const [movie, doesExist] = await MovieService.insert(req.body);

  if (doesExist) {
    res.send({
      status: 0,
      error: {
        fields: {
          title: "NOT_UNIQUE",
        },
        code: "MOVIE_EXISTS",
      },
    });
  } else {
    res.send(movie);
  }
};
