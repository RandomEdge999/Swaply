import express from 'express';
import { requestRental, shipRental, receiveRental, returnRental, confirmReturn, getMyRentals } from '../controllers/rentalController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/request', authenticateToken, requestRental);
router.post('/ship', authenticateToken, shipRental);
router.post('/receive', authenticateToken, receiveRental);
router.post('/return', authenticateToken, returnRental);
router.post('/confirm', authenticateToken, confirmReturn);
router.get('/my-rentals', authenticateToken, getMyRentals);

export default router;
