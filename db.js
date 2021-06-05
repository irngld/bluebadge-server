const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, "postgres", process.env.DB_PWD, {
  //   host: "localhost",
  dialect: "postgres",
  logging: false, // turns off CLI
});

module.exports = db;
