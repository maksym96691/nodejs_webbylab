const Movie = require("../models/sequelize/Movie");
const MovieService = require("../services/movieService.js");

// async function setupAssociations(res, movie) {
//   res.locals.actors.forEach((actor) => {
//     await movie.addActor(actor);
//   });
// }

module.exports.insertMovie = async (req, res) => {
  console.log("111111111111", req.body);
  let [movie, doesExist] = await MovieService.insert(req.body);
  if (doesExist) {
    // await setupAssociations(res, movie);

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
    res.locals.actors.forEach(async (actor) => {
      await movie.addActor(actor);
    });

    movie = await MovieService.findByTitle(movie.dataValues.title);
    console.log("AFTER ADDING ACTORS", movie);
    res.send(movie);
  }
};
