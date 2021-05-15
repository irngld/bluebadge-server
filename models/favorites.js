const { DataTypes } = require('sequelize');
const database = require('../db')


const Favorites = database.define('favorites', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    drinkId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    drinkName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drinkThumb: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Favorites;
