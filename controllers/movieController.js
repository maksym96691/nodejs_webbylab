const MovieService = require("../services/movieService.js");
const MovieSerializer = require("../serializers/movieSerializer.js");
const fs = require("fs");

module.exports.insertMovie = async (req, res) => {
  let [movie, doesExist] = await MovieService.insert(req.body);
  if (doesExist) {
    res.send(MovieSerializer.movieExists());
  } else {
    res.locals.actors.forEach(async (actor) => {
      await movie.addActor(actor);
    });

    movie = await MovieService.findByTitle(movie.dataValues.title);
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
    return res.send(MovieSerializer.showMovie(movie));
  } else {
    return res.status(404).send(MovieSerializer.movieNotFound(req.params.id));
  }
};

module.exports.updateMovie = async (req, res) => {
  const movie = await MovieService.update(
    req.body,
    req.params.id,
    res.locals.actors
  );
  if (movie) {
    return res.send(MovieSerializer.movieUpdatedSuccessfully(movie));
  } else {
    return res.status(404).send(MovieSerializer.movieNotFound(req.params.id));
  }
};

module.exports.getMovies = async (req, res) => {
  const movies = await MovieService.showAll(req.query);
  return res.send(movies);
};

module.exports.importMovies = (req, res) => {
  fs.readFile(req.file.path, "utf8", async (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    let arr = data.toString().replace(/\r\n/g, "\n").split("\n");
    arr = arr.filter((elem) => elem); //Remove empty elements
    console.log(arr);
    let movies = [];
    let imported = 0,
      total = 0;
    for (let i = 0; i < arr.length; i += 4) {
      let title = arr[i].split(":");
      let year = arr[i + 1].split(":");
      let format = arr[i + 2].split(":");
      let stars = arr[i + 3].split(/[:,]+/);
      stars.forEach(function (star, index, theArray) {
        theArray[index] = star.trim();
      });
      let [movie, doesExist] = await MovieService.insert({
        title: title[1].trim(),
        year: year[1].trim(),
        format: format[1].trim(),
      });
      total++;
      if (!doesExist) {
        movies.push(movie);
        imported++;
      }
    }
    return res.send(MovieSerializer.moviesImported(movies, imported, total));
  });
};
