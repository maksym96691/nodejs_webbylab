const Movie = require("../models/sequelize/Movie.js");
const { Op } = require("sequelize");
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

  static async update(body, id, actors) {
    console.log(body, id);
    const movie = await Movie.findOne({ where: { id: id }, include: Actor });

    // console.log("MOVIE PREV ACTORS", movie.dataValues["Actors"]);

    movie.set({
      title: body.title,
      year: body.year,
      format: body.format,
    });

    movie.dataValues["Actors"].forEach(async (actor) => {
      await actor.removeMovie(movie);
    });

    actors.forEach(async (actor) => {
      console.log("Adding actor to movie");
      await movie.addActor(actor);
    });

    await movie.save();

    return movie;
  }

  static async showAll(params) {
    // const movie = await Movie.findOne({ where: { id: id }, include: Actor });
    // return movie;
    let { sort, order, offset, limit, actor, title } = params;
    let movies = await Movie.findAll();

    if (actor) {
      let [firstName, lastName] = actor.split(" ");
      movies = await Movie.findAll({
        include: {
          model: Actor,
          as: "Actors",
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.substring]: firstName,
                },
              },
              {
                lastName: {
                  [Op.substring]: lastName,
                },
              },
            ],
          },
        },
      });
    }

    if (title) {
      movies = await Movie.findAll({
        where: {
          title: {
            [Op.substring]: title,
          },
        },
        include: Actor,
      });
    }

    // Actor

    // Sort
    switch (sort) {
      case "title":
        movies.sort((e1, e2) => {
          if (e1.title > e2.title) return 1;
          else if (e1.title < e2.title) return -1;
          else return 0;
        });
        break;
      case "id":
        movies.sort((e1, e2) => {
          return e1.id - e2.id;
        });
        break;
      default:
        movies.sort((e1, e2) => {
          return e1.year - e2.year;
        });
        break;
    }

    // Search - didn't understand what has to be here. Combined search (movie + actor). What does it mean?

    // Order

    if (order == "DESC") movies.reverse();

    // Offset

    if (offset) {
      offset = parseInt(offset);
      console.log("MOVIES BEFORE", movies);
      movies = movies.slice(offset);
      console.log("MOVIES AFTER", movies);
    }
    // Limit

    limit = parseInt(limit);
    if (limit < movies.length) {
      movies.splice(limit);
    }

    return movies;
    // console.log("PARAMS", params);
  }
}

module.exports = MovieService;
