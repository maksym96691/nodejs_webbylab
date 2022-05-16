require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // req.body.token || req.query.token

  if (!token) {
    return res.status(403).send({
      status: 0,
      error: {
        fields: {
          token: "REQUIRED",
        },
        code: "FORMAT_ERROR",
      },
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      status: 0,
      error: {
        fields: {
          token: "INVALID",
        },
        code: "INVALID_TOKEN_ERROR",
      },
    });
  }
  return next();
};

module.exports = verifyToken;
