const SessionService = require("../services/sessionService");
const SessionSerializer = require("../serializers/sessionSerializer");

module.exports.login = async (req, res) => {
  const result = await SessionService.login(req.body);
  if (result == "AUTH_FAILED") {
    res.status(400).send(SessionSerializer.authFailed());
  } else {
    res.status(200).send(SessionSerializer.authSuccess(result));
  }
};
