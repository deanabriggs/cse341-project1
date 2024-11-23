// routes/users.js
// Sub-directory for Users - using functions from the related controller

const router = require('express').Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

// Exporting the router
module.exports = router;