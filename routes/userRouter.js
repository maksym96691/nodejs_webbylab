const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

module.exports = (params) => {
  router.get("/", (req, res) => {
    res.send("hi from user");
  });

  router.post("/", UserController.register);

  return router;
};
