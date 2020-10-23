const Sequelize = require('sequelize');

// For local MySQL
// const sequelize = new Sequelize('db', 'root', '', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// For remote on GCP
const sequelize = new Sequelize('db', 'root', '', {
  dialect: 'mysql',
  host: '/cloudsql/proven-mind-243406:asia-southeast1:gt-school',
  timestamps: false,
  dialectOptions: {
    socketPath: '/cloudsql/proven-mind-243406:asia-southeast1:gt-school'
}});

module.exports = sequelize;
