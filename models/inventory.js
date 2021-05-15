const { DataTypes } = require('sequelize');
const database = require('../db')


const Inventory = database.define('inventory', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alcohol: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true  // prevents Sequelize from pluralizing table name to "inventories"
})

module.exports = Inventory;
