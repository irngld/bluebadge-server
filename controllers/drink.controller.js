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

  const alcType = req.body.drink; // i.e. drill down for the actual type
  const url = `${baseURL}filter.php?i=${alcType}`;

  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((drinks) =>
      res.status(200).json({ message: `Found ${drinks} saved drinks!`, drinks })
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
//get list of ingredients
router.get("/ingredients", (req, res) => {
  const url = `${baseURL}list.php?i=list`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((drinks) => res.status(200).json(drinks))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error: Not able to get your posion", error: err })
    );
});

router.get("/drinkfact", async (req, res) => {
  
  try{
    // const ingredientsUrl = `${baseURL}list.php?i=list`;
    //  const ingredientResponse = await fetch(ingredientsUrl)
    //  const data = await ingredientResponse.json();

    //  const ingredients = data?.drinks
    // if(ingredients == null || ingredients.length == 0)
    //    return res.status(500).json({ message: "Error: Not able to retrieve ingredients for drink fact", error: err })
    //    const bogusIngredients = ['water','lemon','milk','egg yolk','egg','lemonade','lime juice','grape juice','sugar','coffee liqueur','watermelon','carbonated water','chocolate liqueur','lemon vodka','demerara sugar','blended whiskey','orange','cocoa powder']
       const filteredIngredients = ['Vodka', 'Sloe Gin', 'Wine', 'Gin', 'Scotch', 'Tequila', 'Brandy', 'Bourbon', 'Whiskey', 'Cognac', 'Ale', 'Lager']
       const randomIngredient = filteredIngredients[Math.floor(Math.random() * filteredIngredients.length)];

       const detailsUrl = `${baseURL}search.php?i=${randomIngredient}`;
        const detailsResponse = await fetch(detailsUrl)
        const detailData = await detailsResponse.json()
        const ingredientDetails = detailData?.ingredients[0]
       return res.status(200).json(ingredientDetails)
    
  }catch(err){
    return res.status(500)
    .json({ message: "Error: Not able to retrieve drink fact", error: err })
  }
});

router.post("/name", (req, res) => {
  console.log(req.body);
  const alcType = req.body.drink; // i.e. drill down for the actually type
  const url = `${baseURL}search.php?s=${alcType}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((drinks) =>
      res
        .status(200)
        .json({ message: `Found ${drinks.length} saved drinks!`, drinks })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error: Not able to get your posion", error: err })
    );
});

module.exports = router;
