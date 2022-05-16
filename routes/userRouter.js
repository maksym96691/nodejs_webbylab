const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

module.exports = (params) => {
  router.post("/", UserController.register);

  return router;
};
