require("dotenv").config();
const express = require("express");
const User = require("../models/sequelize/User.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (params) => {
  //   const { sessionService } = params;

  router.get("/", (req, res) => {
    res.send("hi from session");
  });

  router.post("/", async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      console.log("EMAIL:", email);
      // Validate if user exist in our database
      const user = await User.findOne({ where: { email: email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  });

  return router;
};
