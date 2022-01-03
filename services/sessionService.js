require("dotenv").config();
const User = require("../models/sequelize/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class SessionService {
  static async login(params) {
    try {
      const { email, password } = params;

      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ where: { email: email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        user.token = token;
        return user;
      } else {
        return "AUTH_FAILED";
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SessionService;
