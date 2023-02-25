const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Message = sequelize.define("message", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Message;