// bikeRoutes.js
import express from 'express';
import { getAllBikes, addBike, getBikeById, updateBike, deleteBike } from '../controllers/bikeController.js';

const router = express.Router();

router.get('/', getAllBikes);
router.post('/', addBike);
router.get('/:id', getBikeById);
router.put('/:id', updateBike);
router.delete('/:id', deleteBike);

export default router;
