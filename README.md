# NodeJS API Asessment

## About 
Basic API that emulates the administrative needs of teachers in school.

## Tech Stack
This mini-project is written in NodeJS with Express.js framework.  
Database is with MySQL. Sequelize is used to support the DB connection, and provides an ORM framework to more effectively handle SQL schemas and relationships.

## Deployment
The project is deployed on Google Cloud platform with Cloud Run and Cloud SQL. It is hosted at this url [https://govtech-school-dt6gbmxnwa-as.a.run.app/](https://govtech-school-dt6gbmxnwa-as.a.run.app/).

> Will not stay up forever. My 100$ credits just ran out :(

## Postman Docs
See published Postman documentation at [https://documenter.getpostman.com/view/8025605/TVYDezKz](https://documenter.getpostman.com/view/8025605/TVYDezKz). 

## Run locally
1. Clone this repository
```
https://github.com/yjpan47/govtech-d3hiring.git
```

2. Install node dependencies
```
npm install
```

3. Configuration the database URL in `./db.js`. If you are running MySQL on local machine, Sequelize engine will most likely be initiated like this:
```
const sequelize = new Sequelize({database}, {user}, {password}, {
     dialect: 'mysql',
     host: 'localhost'
});
```

4. Run the application
```
npm start
```

5. Try out the endpoints on Postman 
Go to [https://documenter.getpostman.com/view/8025605/TVYDezKz](https://documenter.getpostman.com/view/8025605/TVYDezKz). Click **Run in Postman** at the top right to add the collection to local Postman desktop application.

## Unit Test
Unit testing is done with Mocha and Chai framework. 
```
npm test
```
