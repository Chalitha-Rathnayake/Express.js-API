var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../app');
const StudentModule = require('../models/student-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Students ');
});

// Create Student
router.post('/add', function(req, res, next) {

    let newStudent = new StudentModule({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.age,
        dob : req.body.dob,
        department : req.body.department
    });
    newStudent.save((err, newStudent) => {
        if(err)
        res.send(err);
        else
        res.send({status:200, message: "user added successfully", studentobj: newStudent});
    });    
});

// Read Student
router.get('/list', function(req, res, next){

  StudentModule.find(function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, resultFound: response.length, students: response});
  });

});

router.get('/searchByName', function(req, res, next) {  //multiple query params
  const firstNameQuery = req.query.firstName;
  const lastNameQuery = req.query.lastName;
  StudentModule.find({firstName: firstNameQuery, lastName: lastNameQuery}, function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, resultFound: response.length, students: response});
  });

});

router.get('/searchById', function(req, res, next) {
  const idQuery = req.query.id;
  StudentModule.findById(idQuery, function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, students: response});
  });

});

// Update Student
router.put('/update', function(req, res, next) {
  const department = req.query.department;
  StudentModule.update({age: 24}, {department: department}, function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, students: response});
  });

});

router.put('/updateUser', function(req, res, next) {
  const id = req.query.userId;
  const fName = req.query.firstName;
  StudentModule.findByIdAndUpdate(id, {firstName: fName}, function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, students: response});
  });

});

//Delete Student
router.delete('/delete', function(req, res, next) {
  const id = req.query.id;
  StudentModule.findByIdAndDelete(id, function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, students: response});
  });

});

router.delete('/deleteUser', function(req, res, next) {
  const fName = req.query.firstName;
  const age = req.query.age;
  StudentModule.remove({firstName: fName}, {age: age}, function(err, response){
    if(err)
    res.send(err)
    else
    res.send({status: 200, students: response});
  });

});

module.exports = router;
