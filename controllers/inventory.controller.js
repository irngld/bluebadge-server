const router = require('express').Router();
const Inventory = require('../models/inventory');
const validate = require('../middleware/validateSession');


router.get('/test', (req, res) => {
    res.send('This is an inventory test')
})


// ADD AN INVENTORY ITEM
router.post('/add', (req, res) => {
    Inventory.create({
        userId:  1,// req.user.id,
        ingredientId:  1, // req.body.idIngredient,
        name: "absolut", // req.body.drinkName,  // absolut, smirnoff
        type: "vodka",  // e.g  vodka, bourbon
        alcohol: true // boolean value needed 'yes' / 'no' , use ternary operator (req.body.alc === 'yes') ? true : false
    })
    .then((invItem) => {
        // let token = jwt.sign({ id: favDrink.id }, process.env.SECRET, { expiresIn: '1d' })
        res.send({ invItem });
    })
    .catch( err => res.status(500)
        .json({ 
            message: "Inventory item not saved", 
            error: err
        })
    )
})


// GET INVENTORY ITEMS
router.get('/show', (req, res) => {
    Inventory.findAll()
        .then(invItem => res.status(200).json( { message: `Found ${invItem.length} inventory item(s)!`, invItem }))
        .catch(err => res.status(500).json({ message: "Error: No inventory items", error: err}))
})


// DELETE INVENTORY ITEMS
router.delete('/remove/:id', validate, (req, res) => {
    Inventory.destroy({
        where: { 
            id: req.params.id
        }
    })
    .then(invItem => res.status(200).json({ message: `Inventory item ${req.params.id} has been removed!`, invItem }))
    .catch(err => res.status(500).json({message: "Something went wrong. Inventory item not removed.", error: err}))
})

// UPDATE INVENTORY ITEMS
// localhost:8080/inventory/2
// router.put('/:id', validate, (req, res) => {
//     // req.body will hold the new information
//     Inventory.update(req.body, { where: { id: req.params.id }})
//         .then(updated => res.status(200).json({ message: "Update complete!", updated }))
//         .catch(err => res.status(500).json({message: "Not updated.", error: err}))
// })

module.exports = router;