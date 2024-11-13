## Step 1: Set up GitHub and Initialize Node Project

### Create and Clone a Git Repository

- Start at GitHub
- Create a new repository (give name, public, add a README)
- Click on code and copy the URL
- Open PowerShell and go to the parent directory of where you want the project to reside (can make new folder with `md` command)
- Check that "git" is installed using `git --version`
- Clone the directory to the location using `git clone` plus the copied URL from GitHub
- Use `dir` to ensure the new directory is there (folder will be created using the repository name)
- Open the repository folder and check that you can see the read me file (use `cd` to change and `dir` to see content)

### Create a Node Project

- Check that node is installed using `node --version`
- Use `npm init` to initiate a new node project which creates a package.json file
- Answer prompts (default values are in brackets) to populate the json file
- Prompts include: package name (proj folder), version (default), description (whatever), entry point (use server.js or app.js), test command (skip ok), git repository (paste cloned URL), keywords (skip), author (my name), license (default)
- Type `yes` when prompted if the json looks good
- Can open the json with notepad using `notepad package.json`

## Step 2: Push to GitHub and Start with Express

### Connect with GitHub

- Commit project to GitHub (adding a note), and Sync Changes
- Authorize with Public

### server.js - Creates Web Server

- Add "server.js" file to the main directory
- Open a terminal window and type `npm i express` to create node_modules with files that act like a web wrapper
- Declare a variable to include the needed library using `const express = require('express');`
- Create a new variable to create a new instance of the express library using `const app = express();`
- Declare a port to run the app using `const port = process.env.PORT || 3000` (3000 being the local port)
- Listen for traffic on the port using `app.listen(port, () => {console.log('Running on port ${port}')});`
- Check that the program is working using by starting the app in the terminal using `node server.js`

### Organize Code

- Create a "routes" folder with a "index.js"
- Include the file in the "server.js" file using `app.use('/', './routes'));`
- To analyze functionaliy, in the "index.js" file add `router.get('/', (req, res) => {res.send('Hello World');});`
- Export the module using `module.exports = router;`
- Save files
- From the terminal window, type `node server.js` to start the program
- From a web browser, go to `localhost:3000` to see the webpage
- Create a ".gitignore" file in the main directory
- Add `/node_modules` to the ".gitignore" file (not necessary to store on git as they can be loaded using the `npm i express` command)
- Push to GitHub

## Step 3: Install MongoDB and Create Database

- Create a new collection (database) in MongoDB
- Create a database user and password
- Choose to connect from local environment
- Select "Add My Current IP Address"
- Go to Database Deployments
- Select "Connect" then "Compass" and copy the connection string
- Go to Network Access and add `0.0.0.0/0` to allow access from any IP
- Select "Insert Document" to add a record (can use json format to add values)

## Step 4: Connect Node Project to MongoDB

- In terminal window, install the driver for mongo using `npm i mongodb`
- Create a "data" folder in the main directory
- Add a database.js file to the data folder
- In the "server.js" file, require the mongodb database library using `const mongodb = require('/data/database.js')
- Creating a function called "initDb" to display the status of the connection using:

```javascript
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node Running on port ${port}`);
    });
  }
});
```

- In the "database.js" file, import a library to help read connection string when not in a production environment using `const dotenv = require('dotenv').config();`
- Import Mongo client using `const MongoClient = require('mongodb').MongoClient;`
- Declare a variable for the database using `let database;`
- Use the initDb function created to using:

```javascript
const initDb = (callback) => {
  //setup the database
  if (database) {
    //report that it's already initialiezed
    console.log("Db is already initialized!");
    //return the database (return will end the function)
    return callback(null, database);
  }
  //if not, call MongoDB connect,
  MongoClient.connect(process.env.MONGODB_URL)
    //if it's successful, then return the client to the database variable
    .then((client) => {
      database = client;
      callback(null, database);
    })
    //if not successful, return an error
    .catch((err) => {
      callback(err);
    });
};
```

- Add a function to get the database function using `const getDatabase= () => {if (!database){throw Error('Database not initialized')} return database;}
- Create an ".env" file in the main repository.
- In the ".env" file, create a variable for the mongo database using `MONGODB_URL = ` plus the copied URL link from mongo, updating the username and password to match the database user. Then add the database to the address `\project1`
- In the terminal install the dotevn drivers using `npm i dotenv`
- Test the connection from the terminal using `node server.js`

## Step 5: Add the Get and GetAll endpoints

- In the "index.js" file, add additional routes. Each collection should have it's own js file which the index file should point to. Example: `router.use('/users', require('./users'));`
- Using the example, you would create a "users.js" file in the routes folder
- In the "users.js" file, add the variables for express and router using `const express = require('express');` and `const router = express.Router();`
- For organization, create a "controllers" folder in the main repository.
- In the controllers folder, add another file called "users.js".
- In the "routes/users.js" file, add a variable to connect to the controllers file using `const usersController = require('../controllers/users');`
- In the "controllers/user.js" file, contect to the database using `const mongodb = require('../data/database');`
- Create an object for the object entry from the database using `const ObjectId = require('mongodb').ObjectId;`
- Create the functions in the "controllers\users.js" file using:

```javascript
// Express middleware uses the "req, res" to pull and push data
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};
```

- Export the functions usings:

```javascript
module.exports = {
  getAll,
  getSingle,
};
```

- Check that it is functioning by running `node server.js` in the terminal. Open "localhost:3000\users" in a web browser. You should see data from the database.
- Push to GitHub

## Step 6 - Deploy to Render & Test

### Setup account at Render

- Create a new "Web Service"
- Connect with GitHub -authorize -login to GitHub
- Select repository to connect
- From the Render Dashboard, answer prompts: Name, Region, Branch (main), Runtime (Node), Build Command (npm i), Start Command (npm start) - then select Deploy
- URL will be generated to view on live website

### Setup Environment Variables

- Key = MONGODB_URL (as shown in the ".env" file)
- Value = (the database URL as defined in the ".env" file)

### Setup environment variables for Mongo

Need to have Mongo allow Render to access

- Navigate to mongodb.com and login
- Go to "Network Access" and add an IP address 0.0.0.0/0 (allows any IP)
- Save Changes
- After deploy, check the render URL provided to ensure data can be accessed there

### Use Swagger

## Add functionality

- In a terminal window, run `npm install nodemon --save-dev` which will add development dependencies which will allow a refresh to show updates on the localhost
