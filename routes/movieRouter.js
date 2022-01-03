const express = require("express");
const MovieController = require("../controllers/movieController");
const auth = require("../middleware/auth.js");
const validation = require("../middleware/validation.js");
const multer = require("multer");

const upload = multer({ dest: "public/files" });

const router = express.Router();

module.exports = (params) => {
  router.post("/", auth, validation, MovieController.insertMovie);
  router.delete("/:id", auth, MovieController.deleteMovie);
  router.get("/:id", auth, MovieController.showMovie);
  router.patch("/:id", auth, validation, MovieController.updateMovie);
  router.get("/", auth, MovieController.getMovies);
  router.post(
    "/import",
    auth,
    upload.single("movies.txt"),
    MovieController.importMovies
  );

  return router;
};
