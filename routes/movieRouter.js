const express = require("express");
const MovieController = require("../controllers/movieController");

const router = express.Router();

module.exports = (params) => {
  router.post("/", MovieController.insertMovie);

  return router;
};
