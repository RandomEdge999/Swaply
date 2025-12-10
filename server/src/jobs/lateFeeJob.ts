import prisma from '../utils/prisma';

export const checkLateFees = async () => {
    console.log('Running late fee check...');
    try {
        const now = new Date();

        // Find rentals that are ACTIVE but past their end date
        // OR rentals that are already OVERDUE
        const overdueRentals = await prisma.rental.findMany({
            where: {
                OR: [
                    { status: 'ACTIVE', rentalEndDate: { lt: now } },
                    { status: 'OVERDUE' }
                ]
            },
            include: { listing: true }
        });

        for (const rental of overdueRentals) {
            // If status is ACTIVE, mark as OVERDUE
            if (rental.status === 'ACTIVE') {
                await prisma.rental.update({
                    where: { id: rental.id },
                    data: { status: 'OVERDUE' }
                });
                console.log(`Rental ${rental.id} marked as OVERDUE`);
            }

            // Calculate late fee logic
            // For MVP: Simple check. If it's overdue, add a fee record for today if not exists.
            // In real world, we'd check if we already charged for this week/day.
            // Let's assume we charge daily for simplicity of MVP demonstration.

            const feeAmount = rental.listing.baseRentalPrice * 0.1; // 10% daily late fee

            // Check if we already charged a fee for today
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const existingFee = await prisma.lateFee.findFirst({
                where: {
                    rentalId: rental.id,
                    createdAt: { gte: todayStart }
                }
            });

            if (!existingFee) {
                await prisma.lateFee.create({
                    data: {
                        rentalId: rental.id,
                        periodStart: now,
                        periodEnd: now,
                        feeAmount,
                        chargedSuccessfully: true // Mock success
                    }
                });
                console.log(`Late fee of ${feeAmount} applied to rental ${rental.id}`);
            }
        }
    } catch (error) {
        console.error('Error in late fee job:', error);
    }
};

// Simple interval runner
export const startLateFeeJob = () => {
    // Run every 24 hours in production, but for demo every 1 minute
    setInterval(checkLateFees, 60 * 1000);
};
