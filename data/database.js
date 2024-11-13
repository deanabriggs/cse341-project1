
// helps read connections string in when not in production environment
const dotenv = require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let database;

// 
const initDb = (callback) => {
    //setup the database
    if (database) {
        //report that it's already initialiezed
        console.log('Db is already initialized!');
        //return the database (return will end the function)
        return callback (null, database);
    }
    //if not, call MongoDB connect, 
    MongoClient.connect(process.env.MONGODB_URL)
    //if it's successful, then return the client to the database variable
    .then((client) => {
        database = client;
        callback(null, database);
    })
    //if not successful, return an error
    .catch((err) =>{
        callback(err);
    });
}

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database;
}

module.exports = {
    initDb,
    getDatabase
}