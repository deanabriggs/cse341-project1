// routes/users.js
// Sub-directory for Users - using functions from the related controller

const router = require('express').Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Exporting the router
module.exports = router;