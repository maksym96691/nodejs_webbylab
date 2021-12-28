const express = require("express");
const sequelize = require("./database");

sequelize.sync().then(() => console.log("Db is ready"));

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
