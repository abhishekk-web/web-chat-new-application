const Sequelize = require('sequelize');

const sequelize = new Sequelize("new-chat-application", "root", "nodecomplete", {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;