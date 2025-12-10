import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createListing = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { title, platform, region, condition, purchasePrice, baseRentalPrice, allowedDurations, city } = req.body;

        const listing = await prisma.gameListing.create({
            data: {
                ownerId: userId,
                title,
                platform,
                region,
                condition,
                purchasePrice: parseFloat(purchasePrice),
                baseRentalPrice: parseFloat(baseRentalPrice),
                allowedDurations: JSON.stringify(allowedDurations), // Store as JSON string
                city,
                status: 'ACTIVE', // Default to ACTIVE for MVP
            },
        });

        res.status(201).json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getListings = async (req: Request, res: Response) => {
    try {
        const { platform, city, condition } = req.query;

        const where: any = { status: 'ACTIVE' };
        if (platform) where.platform = String(platform);
        if (city) where.city = String(city);
        if (condition) where.condition = String(condition);

        const listings = await prisma.gameListing.findMany({
            where,
            include: { owner: { select: { name: true, ratingAverage: true } } },
            orderBy: { createdAt: 'desc' },
        });

        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getListingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const listing = await prisma.gameListing.findUnique({
            where: { id },
            include: { owner: { select: { name: true, ratingAverage: true, id: true } } },
        });

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
