const mongoose = require('mongoose');
const url = 'mongodb://friend-user:complex@node10805-friendsget.us.reclaim.cloud/friends';
//const url = 'mongodb://localhost/students';
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to Database');
});

db.on('error', (error) => {
    console.error('Connection error: ', error);
});

module.exports = db;
