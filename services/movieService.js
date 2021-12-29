const Movie = require("../models/sequelize/Movie.js");
const Actor = require("../models/sequelize/Actor.js");
const ActorService = require("./actorService.js");

class MovieService {
  static async insert(params) {
    let doesExist = false;
    let newMovie = null;
    const oldMovie = await Movie.findOne({ where: { title: params.title } });
    if (oldMovie) {
      doesExist = true;
    } else {
      newMovie = await Movie.create({
        title: params.title,
        year: params.year,
        format: params.format,
      });
    }

    return [newMovie, doesExist];
  }
}

module.exports = MovieService;
