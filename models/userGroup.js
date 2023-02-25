const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const userGroup = sequelize.define('userGroup', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }

})

module.exports = userGroup;