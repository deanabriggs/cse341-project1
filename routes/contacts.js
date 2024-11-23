// routes/contacts.js
// Sub-directory for Contacts - using functions from the related controller

const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

// Exporting the router
module.exports = router;