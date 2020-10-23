const Sequelize = require('sequelize');

const sequelize = require('../db');

const Student = sequelize.define(
  'student', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    suspended: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, { timestamps: false }
);

module.exports = Student;