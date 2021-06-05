const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  ssl: true,
  protocol: "postgres",
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
