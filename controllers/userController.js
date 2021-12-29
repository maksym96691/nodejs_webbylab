const User = require("../models/sequelize/User");
const UserService = require("../services/userService.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const result = await UserService.register(req.body);

  switch (result) {
    case "All input is required":
    case "Passwords do not match. Try again":
    case "User Already Exist. Please Login":
      res.status(400).send(result);
      break;
    default:
      res.status(201).json(result);
  }
};
