require("dotenv").config();
const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/sessionController");

module.exports = (params) => {
  router.post("/", SessionController.login);

  return router;
};
