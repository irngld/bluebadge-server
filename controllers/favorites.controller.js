// const cors = require('cors');
const router = require("express").Router();
const Favorites = require("../models/favorites");
const validate = require("../middleware/validateSession");

router.get("/test", (req, res) => {
  res.send("This is a favorites test");
});

// ADD A FAVORITE DRINK
router.post("/add", validate, (req, res) => {
  console.log(req.user);
  // console.log(req.body);
  Favorites.findAll({
    where: {
      userId: req.user.id,
      drinkId: req.body.drinkId,
    },
  })
    .then((existingFavorites) => {
      if (existingFavorites === null || existingFavorites.length > 0) {
        return res.status(200).send(existingFavorites[0]);
      } else {
        Favorites.create({
          userId: req.user.id,
          drinkId: req.body.drinkId,
          drinkName: req.body.drinkName, // bcrypt.hashSync(req.body.password, 10)
          drinkThumb: req.body.drinkThumb,
          rating: req.body.rating,
        })
          .then((favDrink) => {
            // let token = jwt.sign({ id: favDrink.id }, process.env.SECRET, { expiresIn: '1d' })
            res.status(200).send({ favDrink });
          })
          .catch((err) =>
            res.status(500).json({
              message: "Favorite drink not saved",
              error: err,
            })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "Favorite drink not saved",
        error: err,
      })
    );
});

// GET FAVORITE DRINKS
router.get("/show", validate, (req, res) => {
  Favorites.findAll({
    where: {
      userId: req.user.id,
    },
  })
    .then((favDrink) => res.status(200).json({ message: `Found ${favDrink.length} saved drinks!`, favDrink }))
    .catch((err) => res.status(500).json({ message: "Error: No saved drinks", error: err }));
});

// UPDATE FAVORITE DRINK RATINGS
router.put("/rating/:id", validate, (req, res) => {
  // req.body will hold the new information
  console.log(`userId:${req.user.id}, drinkId:${req.params.id}, rating:${req.body.newRating}`, typeof req.body.newRating);
  Favorites.update(
    { rating: req.body.newRating },
    {
      where: {
        userId: req.user.id,
        drinkId: req.params.id,
      },
    }
  )
    .then((updated) => res.status(200).json({ message: "Update complete!", updated }))
    .catch((err) => res.status(500).json({ message: "Not updated.", error: err }));
});

// DELETE FAVORITE DRINK
router.delete("/remove/:id", validate, (req, res) => {
  Favorites.destroy({
    where: {
      userId: req.user.id,
      drinkId: req.params.id,
    },
  })
    .then((favDrink) => res.status(200).json({ message: `Favorite drink ${req.params.id} has been removed!`, favDrink }))
    .catch((err) => res.status(500).json({ message: "Something went wrong. Favorite drink not removed.", error: err }));
});

module.exports = router;
