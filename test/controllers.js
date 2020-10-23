const expect = require('chai').expect;
const sinon = require('sinon');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Controller = require('../controllers/controllers');


it('Register students', function(done) {
    sinon.stub(Teacher, 'findByPk');
    Teacher.findByPk.returns({
        email: 'teacherken@gmail.com',
        addStudent: (student) => { }
    })
    sinon.stub(Student, 'findByPk');
    Student.findByPk.returns({
        email: 'studentjohn@gmail.com',
    }) 

    const req = {
    body: {
        teacher: 'teacherken@gmail.com',
        students: ['studentsusan@gmail.com', 'studentgary@gmail.com']
    }};

    const res = { status: code => {
        return { json: () => {} } 
    }};

    Controller.registerStudent(req, res, () => {}).then(result => {
        expect(Student.findByPk.called).to.be.equal(true);
        expect(Teacher.findByPk.called).to.be.equal(true);
        done();
        Student.findByPk.restore();
        Teacher.findByPk.restore();
    });
});



it('Retrieve students registered to the teachers', function(done) {
    sinon.stub(Teacher, 'findByPk');
    Teacher.findByPk.returns({
        email: 'teacherken@gmail.com',
    })

    const req = {
    query: {
        teacher: ['teacherken@gmail.com', 'teachersam@gmail.com']
    }};

    const res = { status: code => {
        return { json: () => {} } 
    }};

    Controller.commonStudents(req, res, () => {}).then(result => {
        expect(Teacher.findByPk.called).to.be.equal(true);
        done();
        Teacher.findByPk.restore();
    });
});

it('Suspend a student', function(done) {
    sinon.stub(Student, 'findByPk');
    Student.findByPk.returns({
        email: 'studentbenny@gmail.com',
    })

    const req = {
    body: {
        student: 'studentbenny@gmail.com'
    }};

    const res = { status: code => {
        return { json: () => {} } 
    }};

    Controller.suspendStudent(req, res, () => {}).then(result => {
        expect(Student.findByPk.called).to.be.equal(true);
        done();
        Student.findByPk.restore();
    });
});


it('Notification', function(done) {
    sinon.stub(Teacher, 'findByPk');
    Teacher.findByPk.returns({
        email: 'teacherken@gmail.com',
    })

    const req = {
    body: {
        teacher: 'teacherken@gmail.com',
        notification: 'Hello students! @studentagnes@gmail.com @studentbob@gmail.com'
    }};

    const res = { status: code => {
        return { json: () => {} } 
    }};

    Controller.retrieveForNotifications(req, res, () => {}).then(result => {
        expect(Teacher.findByPk.called).to.be.equal(true);
        done();
        Teacher.findByPk.restore();
    });
});