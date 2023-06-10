const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../database');

const contact = sequelize.define(
    'contacts',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedId: {
            type: DataTypes.INTEGER
        },
        linkPrecedence: {
            type: DataTypes.STRING
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }
);

module.exports = contact;
