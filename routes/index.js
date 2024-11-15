// routes/index.js
// Home page route and direction for sub-routes

const router = require('express').Router();

// Home page route
router.get('/', (req, res) => {res.send('Home Page')});

// Sub-routes
router.use('/users', require('./users'));
router.use('/contacts', require('./contacts'));

// Exports router
module.exports = router;