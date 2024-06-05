const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

// Create a new Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'attendance_management_system',
});

// Define your User model using Sequelize
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },

        // createdAt: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW,
        // },
});

// Sync the model with the database

module.exports = User;
