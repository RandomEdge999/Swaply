import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

import authRoutes from './routes/authRoutes';
import listingRoutes from './routes/listingRoutes';
import rentalRoutes from './routes/rentalRoutes';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/rentals', rentalRoutes);

app.get('/', (req, res) => {
    res.send('Swaply API is running');
});

import { startLateFeeJob } from './jobs/lateFeeJob';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startLateFeeJob();
});
