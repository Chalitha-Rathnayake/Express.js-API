const mongoose = require('mongoose');

var studentSchema  = mongoose.Schema({
    studentID : Number,
    firstName : String,
    lastName : String,
    age : Number,
    dob : String,
    department : String
});

var StudentModule = mongoose.model("Student", studentSchema);

module.exports = StudentModule;