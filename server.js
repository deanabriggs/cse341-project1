// server.js
// Sets up a server and listens on the specified port
// It initializes the connection to the database before starting the server

const express = require('express');
const mongodb = require('./data/database');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } 
    else {
        app.listen (port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});