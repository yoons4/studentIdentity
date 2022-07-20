const express = require('express');
const router = express.Router();
CourseStudent = require('../models/student');

function HandleError(response, reason, message, code){
    console.log('ERROR: ', reason);
    response.status(code || 500).json({"error": message});
}


router.get('/get', (request, response) => {
    CourseStudent.find().exec((error, student) => {
        if (error){
            HandleError(response, "error retrieving data", "get failed", 500);
        } else {
            response.send(student);
        }
    });
});

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
            student.save(() => {
                if (error){
                    response.send({"error": error});
                } else {
                    response.send({"id": student.id});
                }
            });
        }
});

router.put('/put/:id', (request, response) => {
    try{
        const id = request.params.id;
        const updatedData = request.body;
        const options = {new: true};

        const result = CourseStudent.findByIdAndUpdate(
            id, updatedData, options
        )

        response.send(result)
    }
    catch(error){
        response.status(400).json({message: error.message})
    }
});

router.delete('/delete/:id', (request, response) => {

});
module.exports = router;
