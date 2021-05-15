const sequelize = require('sequelize');
const db = require('../db');


const User = db.define('user', {
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: true
    },
    lastName: sequelize.STRING    
})


module.exports = User;