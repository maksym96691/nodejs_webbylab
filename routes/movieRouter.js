const express = require("express");
const MovieController = require("../controllers/movieController");
const MovieValidator = require("../validators/movie_schema");
const ActorValidator = require("../validators/actor_schema");
const { beforeValidate } = require("../models/sequelize/Movie");

const router = express.Router();

module.exports = (params) => {
  router.post("/", validation, MovieController.insertMovie);

  return router;
};

async function validation(req, res, next) {
  console.log("validation");
  let actorValidationError = null;
  // console.log("MOVIE VALIDATOR", MovieValidator);
  console.log("000000000000000000000000000000000000000000000000");
  console.log(req.body.title, req.body.year, req.body.format);
  console.log(MovieValidator);
  try {
    let movieValidationError = await MovieValidator.validateAsync({
      title: req.body.title,
      year: req.body.year,
      format: req.body.format,
    });

    if (!movieValidationError) {
      console.log(req.body.actors);
      for (let i = 0; i < req.body.actors.length; i++) {
        let [first, last] = req.body.actors[i].split(" ");
        // console.log(firstName, lastName);
        console.log(last.length);
        let { actorValidationError, value } = ActorValidator.validate({
          firstName: first,
          lastName: last,
        });
        console.log(actorValidationError);
        if (actorValidationError) {
          console.log("VALIDATION ERROR", actorValidationError);
          res.status(400).send(actorValidationError.details[0].message);
          break;
        }
      }
      next();
    } else {
      console.log("HELLO");
      res.status(400).send(movieValidationError.details[0].message);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
  // console.log("MOVIE VALIDATION ERROR", movieValidationError);
}
