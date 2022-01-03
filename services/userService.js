require("dotenv").config();
const User = require("../models/sequelize/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  static async register(params) {
    try {
      const { name, email, password, confirmPassword } = params;
      if (!(email && password && name && confirmPassword)) {
        return "All input is required";
      }
      if (password != confirmPassword) {
        return "Passwords do not match. Try again";
      }

      const oldUser = await User.findOne({ where: { email: email } });
      if (oldUser) {
        return "User Already Exist. Please Login";
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserService;
