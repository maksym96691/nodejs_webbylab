const MovieValidator = require("../validators/movie_schema");
const ActorValidator = require("../validators/actor_schema");
const ActorService = require("../services/actorService.js");

const validation = async (req, res, next) => {
  let actorArray = [];
  try {
    await MovieValidator.validateAsync({
      title: req.body.title,
      year: req.body.year,
      format: req.body.format,
    });

    for (let i = 0; i < req.body.actors.length; i++) {
      let [first, last] = req.body.actors[i].split(" ");
      await ActorValidator.validateAsync({
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

    // pass actors to the next function so that I can bind each actor to the correspondent movie
    res.locals.actors = actorArray;
    next();
  } catch (err) {
    res.send({ data: err.details[0].message });
  }
};

module.exports = validation;
