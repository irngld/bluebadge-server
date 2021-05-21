// API call

//top 4 bring back drinks
//bottom brings back ingredients for autofill box when user starts to enter the type of alcohol to make a drink with
//endpoints:
// /search/:id
// /search/name/:name
// /search/ingredient/:ingredient
// /lucky
// /ingredients (list all ingredients as an array and filter on front end to allow autocomplete selection
// import fetch from 'cross-fetch';
const router = require("express").Router();
const fetch = require("cross-fetch");

const baseURL = `https://thecocktaildb.com/api/json/v1/1/`;

// Search by ingredient
router.post("/type", (req, res) => {
  console.log(req.body);

  const alcType = req.body.drink;                   // i.e. drill down for the actual type
  const url = `${baseURL}filter.php?i=${alcType}`;

  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((drinks) =>
      res
        .status(200)
        .json({ message: `Found ${drinks} saved drinks!`, drinks })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error: Not able to get your poison", error: err })
    );
});

// Get random drink
router.get("/random", (req, res) => {
  const url = `${baseURL}random.php`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((drinks) => res.status(200).json(drinks))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error: Not able to get your poison", error: err })
    );
});

//drink details
router.get("/details/:id", (req, res) => {
  const url = `${baseURL}lookup.php?i=${req.params.id}`;
  fetch(url)
    .then((res) => res.json())
    .then((drink) => res.status(200).json(drink))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error: Not able to get your poison", error: err })
    );
});

module.exports = router;
