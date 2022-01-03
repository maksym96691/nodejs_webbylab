const UserService = require("../services/userService.js");
const UserSerializer = require("../serializers/userSerializer.js");

module.exports.register = async (req, res) => {
  const result = await UserService.register(req.body);

  switch (result) {
    case "All input is required":
    case "Passwords do not match. Try again":
      res.status(400).send(UserSerializer.inputInvalid(result));
      break;
    case "User Already Exist. Please Login":
      res.status(400).send(UserSerializer.userExists());
      break;
    default:
      res.status(201).send(UserSerializer.userCreated(result));
      break;
  }
};
