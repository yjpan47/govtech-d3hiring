const Sequelize = require('sequelize');

const sequelize = require('../db');

const Teacher = sequelize.define(
  'teacher', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    }
  }, { timestamps: false }
);

module.exports = Teacher;