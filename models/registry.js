const Sequelize = require('sequelize');

const sequelize = require('../db');

const Registry = sequelize.define(
  'registry', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  }, { timestamps: false }
);

module.exports = Registry;