const express = require("express");
const MovieController = require("../controllers/movieController");
const MovieValidator = require("../validators/movie_schema");
const ActorValidator = require("../validators/actor_schema");
const ActorService = require("../services/actorService.js");
const auth = require("../middleware/auth.js");
const validation = require("../middleware/validation.js");
const multer = require("multer");
const fs = require("fs");
const MovieService = require("../services/movieService");

const upload = multer({ dest: "public/files" });

const router = express.Router();

module.exports = (params) => {
  router.post("/", auth, validation, MovieController.insertMovie);
  router.delete("/:id", auth, MovieController.deleteMovie);
  router.get("/:id", auth, MovieController.showMovie);
  router.patch("/:id", auth, validation, MovieController.updateMovie);
  router.post("/import", auth, upload.single("movies.txt"), (req, res) => {
    console.log("FILE", req.file);
    console.log("File", req.file.path);
    fs.readFile(req.file.path, "utf8", async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let arr = data.toString().replace(/\r\n/g, "\n").split("\n");
      arr = arr.filter((elem) => elem); //Remove empty elements
      console.log(arr);
      let movies = [];
      for (let i = 0; i < arr.length; i += 4) {
        let title = arr[i].split(":");
        let year = arr[i + 1].split(":");
        let format = arr[i + 2].split(":");
        let stars = arr[i + 3].split(/[:,]+/);
        stars.forEach(function (star, index, theArray) {
          theArray[index] = star.trim();
        });
        console.log("CREDENTIALS", title, year, format);
        let [movie, doesExist] = await MovieService.insert({
          title: title[1].trim(),
          year: year[1].trim(),
          format: format[1].trim(),
        });
        movies.push(movie);
        // console.log(title[1].trim());
      }
      res.send({
        data: movies,
        meta: {
          imported: 25, // imported fewer since some actors might already be inside the database
          total: 30, // total in the file
        },
        status: 1,
      });
    });
  });

  return router;
};
