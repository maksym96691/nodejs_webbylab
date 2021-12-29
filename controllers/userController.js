const User = require("../models/sequelize/User");
const UserService = require("../services/userService.js");

module.exports.register = async (req, res) => {
  const result = await UserService.register(req.body);

  switch (result) {
    case "All input is required":
    case "Passwords do not match. Try again":
      res.status(400).send({
        status: 0,
        error: {
          message: result,
        },
      });
    case "User Already Exist. Please Login":
      res.status(400).send({
        status: 0,
        error: {
          felds: {
            email: "NOT_UNIQUE",
          },
          code: "USER_NOT_UNIQUE",
        },
      });
      break;
    default:
      res.status(201).json({
        token: result.token,
        status: 1,
      });
  }
};
