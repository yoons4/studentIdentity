const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./database');

const studentsRouter = require('./routes/students');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/students', studentsRouter);

app.listen(8003, () => {
    console.log('Listening on 8003')
})