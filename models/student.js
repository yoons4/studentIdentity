const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseStudent = new Schema({
    studentId: Number,
    courseDepartment: String,
    courseNumber: Number,
    year: Number,
    quarter: Number,
    credits: Number,
    grade: String
});

module.exports = mongoose.model('Student', CourseStudent);