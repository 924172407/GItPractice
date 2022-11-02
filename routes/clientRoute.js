const express = require('express');

clientController = require('../controllers/clientController');

const router = express.Router();

router
    .route('/')
    .get(clientController.getAllClient)
    .post(clientController.createClient);
router
    .route('/:id')
    .get(clientController.getClient);

module.exports = router;