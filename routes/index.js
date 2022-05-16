const express = require("express");

const movieRouter = require("./movieRouter");
const sessionRouter = require("./sessionRouter");
const userRouter = require("./userRouter");

const router = express.Router();

module.exports = (params) => {
  router.use("/movies", movieRouter(params));
  router.use("/users", userRouter(params));
  router.use("/sessions", sessionRouter(params));
  return router;
};
