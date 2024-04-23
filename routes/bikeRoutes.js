const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

router.get('/', bikeController.getAllBikes);
router.post('/', bikeController.addBike);
router.get('/:id', bikeController.getBikeById);
router.put('/:id', bikeController.updateBike);
router.delete('/:id', bikeController.deleteBike);

module.exports = router;
