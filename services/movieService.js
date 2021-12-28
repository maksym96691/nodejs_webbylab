const Movie = require("../models/sequelize/Movie.js");
const Actor = require("../models/sequelize/Actor.js");

class MovieService {
  static async insert(params) {
    const movie = await Movie.create({
      title: params.title,
      year: params.year,
      format: params.format,
    });
    return movie;
  }
}

module.exports = MovieService;
