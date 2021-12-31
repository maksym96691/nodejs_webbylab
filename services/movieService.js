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
      (newMovie = await Movie.create({
        title: params.title,
        year: params.year,
        format: params.format,
      })),
        {
          include: Actor,
        };
    }

    return [newMovie, doesExist];
  }

  static async findByTitle(title) {
    const movie = await Movie.findOne({
      where: { title: title },
      include: Actor, // TODO: FIX this later. Sequelize doesn't seem to preload actors with the movie even though the docs say so and there is valid data in junction table.
    });
    return movie;
  }

  static async delete(id) {
    const movie = await Movie.findOne({ where: { id: id } });
    if (movie) {
      await movie.destroy();
    }

    return movie;
  }

  static async show(id) {
    const movie = await Movie.findOne({ where: { id: id }, include: Actor });
    return movie;
  }
}

module.exports = MovieService;
