const router = require('express').Router();
const Favorites = require('../models/favorites');
const validate = require('../middleware/validateSession');


router.get('/test', (req, res) => {
    res.send('This is a favorites test')
})


// ADD A FAVORITE DRINK
router.post('/add', (req, res) => {
    Favorites.create({
        userId: req.user.id, // CHANGE AS REQUIRED e.g. req.body.userId
        drinkId: req.body.drinkId,
        drinkName: req.body.drinkName, // bcrypt.hashSync(req.body.password, 10)
        drinkThumb: req.body.drinkThumb,
        rating: req.body.rating
    })
    .then((favDrink) => {
        // let token = jwt.sign({ id: favDrink.id }, process.env.SECRET, { expiresIn: '1d' })
        res.send({ favDrink });
    })
    .catch( err => res.status(500)
        .json({ 
            message: "Favorite drink not saved", 
            error: err
        })
    )
})


// GET FAVORITE DRINKS
router.get('/show', (req, res) => {
    Favorites.findAll()
        .then(favDrink => res.status(200).json( { message: `Found ${favDrink.length} saved drinks!`, favDrink }))
        .catch(err => res.status(500).json({ message: "Error: No saved drinks", error: err}))
})


// DELETE FAVORITE DRINK
router.delete('/remove/:id', validate, (req, res) => {
    Favorites.destroy({
        where: { 
            id: req.params.id
        }
    })
    .then(favDrink => res.status(200).json({ message: `Favorite drink ${req.params.id} has been removed!`, favDrink }))
    .catch(err => res.status(500).json({message: "Something went wrong. Favorite drink not removed.", error: err}))
})

// UPDATE FAVORITE DRINK RATINGS
// localhost:8080/favorites/2
// router.put('/favorites/:id', validate, (req, res) => {
//     // req.body will hold the new information
//     Favorites.update(req.body, { where: { id: req.params.id }})
//         .then(updated => res.status(200).json({ message: "Update complete!", updated }))
//         .catch(err => res.status(500).json({message: "Not updated.", error: err}))
// })

module.exports = router;