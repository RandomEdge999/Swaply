import express from 'express';
import { createListing, getListings, getListingById } from '../controllers/listingController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, createListing);
router.get('/', getListings);
router.get('/:id', getListingById);

export default router;
