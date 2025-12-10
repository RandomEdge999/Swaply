import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Cleanup existing data
    await prisma.rental.deleteMany();
    await prisma.gameListing.deleteMany();
    await prisma.user.deleteMany();

    // Create Users
    const password = await bcrypt.hash('password123', 10);

    const owner1 = await prisma.user.create({
        data: {
            email: 'ali.khan@example.com',
            password,
            name: 'Ali Khan',
            phone: '+92 300 1234567',
            role: 'OWNER',
            isVerified: true,
            ratingAverage: 4.8,
            ratingCount: 15,
        },
    });

    const owner2 = await prisma.user.create({
        data: {
            email: 'sara.ahmed@example.com',
            password,
            name: 'Sara Ahmed',
            phone: '+92 321 9876543',
            role: 'OWNER',
            isVerified: true,
            ratingAverage: 4.9,
            ratingCount: 23,
        },
    });

    const renter1 = await prisma.user.create({
        data: {
            email: 'bilal.raza@example.com',
            password,
            name: 'Bilal Raza',
            phone: '+92 333 5555555',
            role: 'RENTER',
            isVerified: true,
        },
    });

    console.log('Created users:', { owner1, owner2, renter1 });

    // Games Data
    const games = [
        {
            title: 'Elden Ring',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 15000,
            baseRentalPrice: 2000,
            city: 'Lahore',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png',
            ownerId: owner1.id,
        },
        {
            title: 'God of War Ragnarök',
            platform: 'PlayStation 5',
            condition: 'NEW',
            purchasePrice: 18000,
            baseRentalPrice: 2500,
            city: 'Lahore',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            ownerId: owner1.id,
        },
        {
            title: 'Marvel\'s Spider-Man 2',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 16000,
            baseRentalPrice: 2200,
            city: 'Karachi',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed92a30563138523f7c96b2c80d554a015514923.png',
            ownerId: owner2.id,
        },
        {
            title: 'FIFA 24 (FC 24)',
            platform: 'PlayStation 5',
            condition: 'GOOD',
            purchasePrice: 12000,
            baseRentalPrice: 1500,
            city: 'Islamabad',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202307/0619/8c647249d968c67925a6239534327743d6a664c48378644c.png',
            ownerId: owner2.id,
        },
        {
            title: 'The Legend of Zelda: Tears of the Kingdom',
            platform: 'Nintendo Switch',
            condition: 'LIKE_NEW',
            purchasePrice: 14000,
            baseRentalPrice: 1800,
            city: 'Lahore',
            region: 'USA',
            imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/07e2a9d867c295796a5647572d278077755c4515286576628037345447171549',
            ownerId: owner1.id,
        },
        {
            title: 'Call of Duty: Modern Warfare III',
            platform: 'Xbox Series X',
            condition: 'NEW',
            purchasePrice: 19000,
            baseRentalPrice: 2500,
            city: 'Karachi',
            region: 'R1',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/0217/56c0b9a669166246461947c46643717d1fa66221f158097d.png',
            ownerId: owner2.id,
        },
        {
            title: 'Cyberpunk 2077: Ultimate Edition',
            platform: 'PlayStation 5',
            condition: 'GOOD',
            purchasePrice: 10000,
            baseRentalPrice: 1200,
            city: 'Lahore',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2811/5f3f773c32c450d243d640231e330f14723795125368437d.png',
            ownerId: owner1.id,
        },
        {
            title: 'Red Dead Redemption 2',
            platform: 'PlayStation 4',
            condition: 'ACCEPTABLE',
            purchasePrice: 5000,
            baseRentalPrice: 800,
            city: 'Islamabad',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202010/2011/1195610660d2323240000000.png',
            ownerId: owner2.id,
        },
        {
            title: 'Hogwarts Legacy',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 13000,
            baseRentalPrice: 1800,
            city: 'Karachi',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/1f5229606d7b6639536c9d30d1d609c4266160d500000000.png',
            ownerId: owner1.id,
        },
        {
            title: 'Super Mario Bros. Wonder',
            platform: 'Nintendo Switch',
            condition: 'NEW',
            purchasePrice: 14000,
            baseRentalPrice: 1800,
            city: 'Lahore',
            region: 'USA',
            imageUrl: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000068683/5b45d709f94357c320402de059666061b42b7d581d6f16447171549',
            ownerId: owner2.id,
        },
        {
            title: 'Resident Evil 4 Remake',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 12000,
            baseRentalPrice: 1500,
            city: 'Islamabad',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202210/0712/e67454f76b1304a0537e9200b8d3c59d1cfc7e63b3693350.png',
            ownerId: owner1.id,
        },
        {
            title: 'Final Fantasy VII Rebirth',
            platform: 'PlayStation 5',
            condition: 'NEW',
            purchasePrice: 19000,
            baseRentalPrice: 2500,
            city: 'Karachi',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202309/1416/23d006d76269636666666666666666666666666666666666.png',
            ownerId: owner2.id,
        },
        {
            title: 'Ghost of Tsushima Director\'s Cut',
            platform: 'PlayStation 5',
            condition: 'GOOD',
            purchasePrice: 10000,
            baseRentalPrice: 1200,
            city: 'Lahore',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202106/2314/5f3f773c32c450d243d640231e330f14723795125368437d.png',
            ownerId: owner1.id,
        },
        {
            title: 'Horizon Forbidden West',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 11000,
            baseRentalPrice: 1400,
            city: 'Islamabad',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202109/2821/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            ownerId: owner2.id,
        },
        {
            title: 'Gran Turismo 7',
            platform: 'PlayStation 5',
            condition: 'GOOD',
            purchasePrice: 12000,
            baseRentalPrice: 1500,
            city: 'Karachi',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/8c647249d968c67925a6239534327743d6a664c48378644c.png',
            ownerId: owner1.id,
        },
        {
            title: 'Ratchet & Clank: Rift Apart',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 9000,
            baseRentalPrice: 1000,
            city: 'Lahore',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202102/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            ownerId: owner2.id,
        },
        {
            title: 'Demon\'s Souls',
            platform: 'PlayStation 5',
            condition: 'GOOD',
            purchasePrice: 8000,
            baseRentalPrice: 900,
            city: 'Islamabad',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202011/1717/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            ownerId: owner1.id,
        },
        {
            title: 'Returnal',
            platform: 'PlayStation 5',
            condition: 'LIKE_NEW',
            purchasePrice: 9000,
            baseRentalPrice: 1000,
            city: 'Karachi',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            ownerId: owner2.id,
        },
        {
            title: 'It Takes Two',
            platform: 'PlayStation 4',
            condition: 'GOOD',
            purchasePrice: 6000,
            baseRentalPrice: 800,
            city: 'Lahore',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202103/2617/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            ownerId: owner1.id,
        },
        {
            title: 'Tekken 8',
            platform: 'PlayStation 5',
            condition: 'NEW',
            purchasePrice: 18000,
            baseRentalPrice: 2200,
            city: 'Islamabad',
            region: 'R2',
            imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/2317/5f3f773c32c450d243d640231e330f14723795125368437d.png',
            ownerId: owner2.id,
        },
    ];

    for (const game of games) {
        await prisma.gameListing.create({
            data: {
                ...game,
                allowedDurations: JSON.stringify(['1 week', '2 weeks']),
                status: 'ACTIVE',
            },
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
