const Sequelize = require('sequelize');

const sequelize = new Sequelize("web-chat-new-application", "root", "nodecomplete", {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;