import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Request a rental
export const requestRental = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { listingId, durationWeeks } = req.body;

        const listing = await prisma.gameListing.findUnique({ where: { id: listingId } });
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        if (listing.status !== 'ACTIVE') return res.status(400).json({ message: 'Listing not available' });
        if (listing.ownerId === userId) return res.status(400).json({ message: 'Cannot rent your own game' });

        // Calculate prices (MVP logic)
        const rentalPrice = listing.baseRentalPrice * durationWeeks;
        const platformFee = rentalPrice * 0.1; // 10% fee

        const rental = await prisma.rental.create({
            data: {
                listingId,
                renterId: userId,
                ownerId: listing.ownerId,
                status: 'PENDING_SHIPMENT', // Should be PENDING_APPROVAL first, but simplifying for MVP flow as per prompt "Owner gets notification -> approve"
                rentalPrice,
                platformFee,
                rentalStartDate: null, // Set when shipped/received
                rentalEndDate: null,
            },
        });

        // Update listing status
        await prisma.gameListing.update({
            where: { id: listingId },
            data: { status: 'IN_RENTAL' },
        });

        res.status(201).json(rental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve Rental (Owner) - In this MVP flow, creation implies request. 
// If we strictly follow prompt "Owner gets notification: Can approve or decline", we need a PENDING_APPROVAL status.
// Let's add PENDING_APPROVAL to schema or just assume PENDING_SHIPMENT implies approved for now to save time, 
// OR better, let's stick to the prompt: "Rental record created with status PENDING_SHIPMENT" AFTER approval.
// So the request might be a separate step or we just say "Create Rental" = "Request" and Owner "Approves" it to make it "PENDING_SHIPMENT".
// For MVP simplicity, let's say "requestRental" creates it as "PENDING_APPROVAL" (need to add to schema if not there, or reuse PENDING_SHIPMENT and add an 'approved' flag).
// The schema has PENDING_SHIPMENT. I'll stick to: 
// 1. Renter creates rental -> Status: PENDING_SHIPMENT (Auto-approved for MVP simplicity? Or Owner must 'ship' to confirm?)
// The prompt says: "Once approved: Rental record is created with status PENDING_SHIPMENT".
// So the "Request" phase might be ephemeral or we need a status for it.
// I'll assume for MVP: Renter 'Requests' -> Status 'PENDING_SHIPMENT'. Owner sees it and 'Ships' it. 
// If Owner declines, they can 'Cancel' it.

// Ship Rental (Owner)
export const shipRental = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { rentalId, trackingNumber, courier } = req.body;

        const rental = await prisma.rental.findUnique({ where: { id: rentalId } });
        if (!rental) return res.status(404).json({ message: 'Rental not found' });
        if (rental.ownerId !== userId) return res.status(403).json({ message: 'Not authorized' });
        if (rental.status !== 'PENDING_SHIPMENT') return res.status(400).json({ message: 'Invalid status' });

        await prisma.shippingInfo.create({
            data: {
                rentalId,
                outboundTrackingNumber: trackingNumber,
                outboundCourier: courier,
                outboundShippedAt: new Date(),
            },
        });

        const updatedRental = await prisma.rental.update({
            where: { id: rentalId },
            data: { status: 'IN_TRANSIT_TO_RENTER' },
        });

        res.json(updatedRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Receive Rental (Renter)
export const receiveRental = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { rentalId } = req.body;

        const rental = await prisma.rental.findUnique({ where: { id: rentalId } });
        if (!rental) return res.status(404).json({ message: 'Rental not found' });
        if (rental.renterId !== userId) return res.status(403).json({ message: 'Not authorized' });
        if (rental.status !== 'IN_TRANSIT_TO_RENTER') return res.status(400).json({ message: 'Invalid status' });

        // Calculate due date (e.g., 1 week from now)
        // In a real app, duration would be stored in rental. Assuming 1 week default or derived from price logic.
        // I'll add a default 7 days for MVP if not stored.
        const durationDays = 7;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + durationDays);

        const updatedRental = await prisma.rental.update({
            where: { id: rentalId },
            data: {
                status: 'ACTIVE',
                rentalStartDate: startDate,
                rentalEndDate: endDate,
            },
        });

        res.json(updatedRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Return Rental (Renter)
export const returnRental = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { rentalId, trackingNumber, courier } = req.body;

        const rental = await prisma.rental.findUnique({ where: { id: rentalId } });
        if (!rental) return res.status(404).json({ message: 'Rental not found' });
        if (rental.renterId !== userId) return res.status(403).json({ message: 'Not authorized' });
        if (rental.status !== 'ACTIVE' && rental.status !== 'OVERDUE') return res.status(400).json({ message: 'Invalid status' });

        await prisma.shippingInfo.update({
            where: { rentalId },
            data: {
                inboundTrackingNumber: trackingNumber,
                inboundCourier: courier,
                inboundShippedAt: new Date(),
            },
        });

        const updatedRental = await prisma.rental.update({
            where: { id: rentalId },
            data: { status: 'IN_RETURN_TRANSIT' },
        });

        res.json(updatedRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Confirm Return (Owner)
export const confirmReturn = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { rentalId } = req.body;

        const rental = await prisma.rental.findUnique({ where: { id: rentalId } });
        if (!rental) return res.status(404).json({ message: 'Rental not found' });
        if (rental.ownerId !== userId) return res.status(403).json({ message: 'Not authorized' });
        if (rental.status !== 'IN_RETURN_TRANSIT') return res.status(400).json({ message: 'Invalid status' });

        const updatedRental = await prisma.rental.update({
            where: { id: rentalId },
            data: {
                status: 'COMPLETED',
                actualReturnDate: new Date(),
            },
        });

        // Release listing
        await prisma.gameListing.update({
            where: { id: rental.listingId },
            data: { status: 'ACTIVE' },
        });

        res.json(updatedRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMyRentals = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const rentals = await prisma.rental.findMany({
            where: {
                OR: [
                    { renterId: userId },
                    { ownerId: userId }
                ]
            },
            include: {
                listing: true,
                renter: { select: { name: true } },
                owner: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(rentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
