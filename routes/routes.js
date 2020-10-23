const express = require('express');
const teacherController = require('../controllers/controllers');

const router = express.Router();

router.post(
    '/register',
    teacherController.registerStudent
);

router.get(
    '/commonstudents',
    teacherController.commonStudents
);


router.post(
    '/suspend',
    teacherController.suspendStudent
);

router.post(
    '/retrievefornotifications', 
    teacherController.retrieveForNotifications
);

module.exports = router;
