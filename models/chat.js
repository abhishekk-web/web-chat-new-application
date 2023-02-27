const Sequelize = require("sequelize");

const sequelize = require('../utils/database');

const Chat = sequelize.define("chat", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    messages: {
        type: Sequelize.STRING,
        allowNull: false
    },
    toUser:{
        type:Sequelize.INTEGER,
        allowNull:false

    }

})

module.exports = Chat;