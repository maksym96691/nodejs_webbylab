const express = require("express");
const MovieController = require("../controllers/movieController");
const MovieValidator = require("../validators/movie_schema");
const ActorValidator = require("../validators/actor_schema");
const ActorService = require("../services/actorService.js");
const auth = require("../middleware/auth.js");
const validation = require("../middleware/validation.js");

const router = express.Router();

module.exports = (params) => {
  router.post("/", auth, validation, MovieController.insertMovie);
  router.delete("/:id", auth, MovieController.deleteMovie);
  router.get("/:id", auth, MovieController.showMovie);
  return router;
};
