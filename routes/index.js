const express = require("express");

const movieRouter = require("./movieRouter");

const router = express.Router();

module.exports = (params) => {
  router.get("/", async (req, res, next) => {
    res.send("test");
  });

  router.use("/movies", movieRouter(params));
  return router;
};
