const express = require("express");
const sequelize = require("./database");
const syncModels = require("./models/sequelize/index");
const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => console.log("Db is ready"))
  .then(() => syncModels(sequelize));

app.use("/api/v1/", router());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
