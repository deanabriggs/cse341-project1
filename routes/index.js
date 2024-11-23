// routes/index.js
// Home page route and direction for sub-routes

const router = require('express').Router();

// Home page route
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Home Page');
});

// Sub-routes
router.use('/contacts', require('./contacts'));
router.use('/', require('./swagger'));

// Exports router
module.exports = router;