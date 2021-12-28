const express = require("express");
const sequelize = require("./database");
const syncModels = require("./models/sequelize/index");

console.log(syncModels);

sequelize
  .sync()
  .then(() => console.log("Db is ready"))
  .then(() => syncModels(sequelize));

const app = express();

app.get("/:id", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
