require('dotenv').config();
const express = require('express');
const app = express();
const database = require('./db');
const userController = require('./controllers/user.controller');
const favoritesController = require('./controllers/favorites.controller');
const inventoryController = require('./controllers/inventory.controller');
const validate = require('./middleware/validateSession');


app.use(require('./middleware/headers'));
app.use(express.json());


app.use('/user', userController);

// everything below this app.use will require the validation in order to be accessed, everything else above is free to use with no token
app.use(validate);
app.use('/inventory', inventoryController);
app.use('/favorites', favoritesController);


database.sync();

app.listen(process.env.PORT, () => {
    console.log(`App is running on port: ${process.env.PORT}`);
})