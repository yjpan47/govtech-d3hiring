const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const TeacherRoutes = require('./routes/routes');
const Teacher = require('./models/teacher');
const Student = require('./models/student');
const Registry = require('./models/registry');
const { render } = require('ejs');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/api', TeacherRoutes);

app.use((req, res, next) => {
    res.write('<h1>Hello D3!!<h1>');
    res.end();
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });



Teacher.belongsToMany(Student, { through: Registry });
Student.belongsToMany(Teacher, { through: Registry });

sequelize
//   .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
