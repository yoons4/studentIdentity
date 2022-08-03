const express = require('express');
const router = express.Router();
CourseStudent = require('../models/student');
var app = express();

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));

function HandleError(response, reason, message, code){
    console.log('ERROR: ', reason);
    response.status(code || 500).json({"error": message});
}


var path = require('path');
router.get('/', (request, response) => {
    response.sendFile(path.resolve('input.html'));
});

/*
app.get('/', function (req, res) {
    res.sendFile('input.html');
})
*/

router.get('/get', (request, response) => {
    CourseStudent.find().exec((error, student) => {
        if (error){
            HandleError(response, "error retrieving data", "get failed", 500);
        } else {
            response.send(student);
        }
    });
});

router.get('/:id', async(request, response) => {
    const id = request.params.id;
    const data = await CourseStudent.findById(id);
    CourseStudent.find().exec((error, student) => {
        if (error){
            HandleError(response, "error retrieving data", "get failed", 500);
        } else {
            response.send(data);
        }
    });
});


router.post('/student-courses', (request, response) => {
    var sentence = "A course: studentId = " + request.body.studentId + '<br>' 
    + "courseDepartment = "+ request.body.courseDepartment + '<br>' +
    "courseNumber = " + request.body.courseNumber + '<br>' +
   "year = " + request.body.year + '<br>' + 
    "quarter = " + request.body.quarter + '<br>' + 
    "credits = " + request.body.credits + '<br>' +
    "grade = " + request.body.grade;

    if(!request.body.studentId || !request.body.courseDepartment || !request.body.courseNumber 
        || !request.body.year || !request.body.quarter || !request.body.credits || !request.body.grade 
        || request.body.quarter > 3 || request.body.quarter < 1){
            HandleError(response, "missing information", "post data missing", 500);
        } else {
            student = new CourseStudent({
                studentId: request.body.studentId,
                courseDepartment: request.body.courseDepartment,
                courseNumber: request.body.courseNumber,
                year: request.body.year,
                quarter: request.body.quarter,
                credits: request.body.credits,
                grade: request.body.grade
            });
            student.save((error) => {
                if (error){
                    response.send({"error": error});
                } else {
                    response.send(sentence);
                }
            });
        }
});

/*
router.post('/post', (request, response) => {
    const studentJSON = request.body;
    if(!studentJSON.studentId || !studentJSON.courseDepartment || !studentJSON.courseNumber || !studentJSON.year || 
        !studentJSON.quarter || !studentJSON.credits || !studentJSON.grade || studentJSON.quarter > 3
         || studentJSON.quarter < 1){
            HandleError(response, "missing information", "post data missing", 500);
        } else {
            student = new CourseStudent({
                studentId: studentJSON.studentId,
                courseDepartment: studentJSON.courseDepartment,
                courseNumber: studentJSON.courseNumber,
                year: studentJSON.year,
                quarter: studentJSON.quarter,
                credits: studentJSON.credits,
                grade: studentJSON.grade
            });
            student.save((error) => {
                if (error){
                    response.send({"error": error});
                } else {
                    response.send({"id": student.id});
                }
            });
        }
});
*/

router.put('/put/:id', async(request, response) => {
    const id = request.params.id;
    const updatedData = request.body;
    const options = {new: true};
    
    if(!updatedData.studentId || !updatedData.courseDepartment || !updatedData.courseNumber || !updatedData.year || 
        !updatedData.quarter || !updatedData.credits || !updatedData.grade || updatedData.quarter > 3
         || updatedData.quarter < 1){
            HandleError(response, "wrong new information", "post data missing", 500);
        } else {
            const result = await CourseStudent.findByIdAndUpdate(
                id, updatedData, options
            )
            response.send(result)
    }
})

router.delete('/delete/:id', async(request, response) => {
    const id = request.params.id;
    const data = await CourseStudent.findByIdAndDelete(id);
    response.send("Selected document has been deleted.");
});
module.exports = router;
