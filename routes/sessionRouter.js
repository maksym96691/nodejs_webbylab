const express = require("express");

const router = express.Router();

module.exports = (params) => {
  //   const { sessionService } = params;

  router.get("/", (req, res) => {
    res.send("hi from session");
  });

  router.post("/", (req, res) => {
    res.send("Login logic here");
  });

  return router;
};
