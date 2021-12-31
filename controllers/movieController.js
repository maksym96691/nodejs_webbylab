const Movie = require("../models/sequelize/Movie");
const MovieService = require("../services/movieService.js");
const MovieSerializer = require("../serializers/movieSerializer.js");

module.exports.insertMovie = async (req, res) => {
  let [movie, doesExist] = await MovieService.insert(req.body);
  if (doesExist) {
    // await setupAssociations(res, movie);

    res.send(MovieSerializer.movieExists());
  } else {
    res.locals.actors.forEach(async (actor) => {
      await movie.addActor(actor);
    });

    movie = await MovieService.findByTitle(movie.dataValues.title);
    console.log("AFTER ADDING ACTORS", movie);
    res.send(movie);
  }
};

module.exports.deleteMovie = async (req, res) => {
  const movie = await MovieService.delete(req.params.id);
  if (movie) {
    return res.send(MovieSerializer.movieDeletedSuccessfully());
  } else {
    return res.status(404).send(MovieSerializer.movieNotFound(req.params.id));
  }
};

module.exports.showMovie = async (req, res) => {
  const movie = await MovieService.show(req.params.id);

  if (movie) {
    console.log("MOVIE:", movie);
    return res.send(MovieSerializer.showMovie(movie));
  } else {
    return res.status(404).send(MovieSerializer.movieNotFound(req.params.id));
  }
};

module.exports.updateMovie = async (req, res) => {
  console.log("MOVIE ACTORS FROM LOCALS", res.locals.actors);
  const movie = await MovieService.update(
    req.body,
    req.params.id,
    res.locals.actors
  );
  if (movie) {
    return res.send({
      data: movie,
      message: "Movie is updated successfully!",
    });
  } else {
    return res.status(404).send("There is no movie with such an id");
  }
};
