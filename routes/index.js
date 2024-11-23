// routes/index.js
// Home page route and direction for sub-routes

const router = require('express').Router();

router.use('/', require('./swagger'));

// Home page route
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Home Page');
});

// Sub-routes
router.use('/users', require('./users'));
router.use('/contacts', require('./contacts'));

// Exports router
module.exports = router;