const express = require("express");
const MovieController = require("../controllers/movieController");
const MovieValidator = require("../validators/movie_schema");
const ActorValidator = require("../validators/actor_schema");
const ActorService = require("../services/actorService.js");

const router = express.Router();

module.exports = (params) => {
  router.post("/", validation, MovieController.insertMovie);

  return router;
};

async function validation(req, res, next) {
  let actorValidationError = null;
  let actorArray = [];
  try {
    let movieValidated = await MovieValidator.validateAsync({
      title: req.body.title,
      year: req.body.year,
      format: req.body.format,
    });

    for (let i = 0; i < req.body.actors.length; i++) {
      let [first, last] = req.body.actors[i].split(" ");
      console.log(first, last);
      let actorValidated = await ActorValidator.validateAsync({
        firstName: first,
        lastName: last,
      });
    }

    for (let i = 0; i < req.body.actors.length; i++) {
      let [first, last] = req.body.actors[i].split(" ");
      let actor = await ActorService.insert({
        firstName: first,
        lastName: last,
      });
      actorArray.push(actor);
    }

    res.locals.actors = actorArray;
    next();
  } catch (err) {
    console.log(err);
    res.send({ data: err.details[0].message });
  }
  // console.log("MOVIE VALIDATION ERROR", movieValidationError);
}
