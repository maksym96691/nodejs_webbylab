const Sequelize = require("sequelize");

const sequelize = new Sequelize("test-db", "user", "pass", {
  host: "./dev.sqlite3",
  dialect: "sqlite",
});

module.exports = sequelize;
