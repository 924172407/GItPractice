const express = require('express');
canteenController = require('../controllers/canteenController');
const router = express.Router();

router.route('/').get(canteenController.getAllCanteen).post(canteenController.createCanteen);
router.route('/:id').get(canteenController.getCanteen);

module.exports = router;