const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Testing the user controller");
});

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  User.create({
    email,
    password: bcrypt.hashSync(req.body.password, 13),
    firstName,
    lastName,
  })
    .then((user) => {
      let token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1d" });
      res.send({
        user,
        token,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "User not created",
        error: error.errors[0].message,
      });
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      //  compare passwords
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        isMatch ? generateToken(user) : res.send("Incorrect Password");
      });
      function generateToken(user) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1d" });
        console.log(token);
        res.send({ user, token });
      }
    } else {
      res.send("Login failed!");
    }
  });
});

module.exports = router;
