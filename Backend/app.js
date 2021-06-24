const express = require('express');

const app = express();

//log "request recieved" & hands on execution
app.use((req, res, next) => {
    console.log('Request recieved!');
    next();
})

//add 201 status code to the response & hands on execution
app.use((req, res, next) => {
    res.status(201);
    next();
})

//send json response & hands on execution
app.use((req, res, next) => {
    res.json( { message : 'Your request was successful!' });
    next()
})

//log "response sent successfully" to the console
app.use((req, res, next) => {
    console.log('Response sent successfully!')
})

module.exports = app;