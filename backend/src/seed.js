import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create Default Admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'admin@einstein.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'admin@einstein.com',
        password: hashedPassword,
      },
    });
    console.log('✅ Created default admin (admin@einstein.com / 123456)');
  } else {
    console.log('ℹ️ Admin already exists');
  }

  // 2. Create Hero Section
  const heroCount = await prisma.heroSection.count();
  if (heroCount === 0) {
    await prisma.heroSection.create({
      data: {
        headline: 'The Premium Space For Deep Focus.',
        subtitle: 'Elevate your academic and professional journey in an environment designed for absolute concentration and success.',
        primaryCtaText: 'Explore Memberships',
        primaryCtaLink: '/membership',
        secondaryCtaText: 'Discover Our Story',
        secondaryCtaLink: '/about',
      },
    });
    console.log('✅ Created Hero Section');
  }

  // 3. Create About Section
  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        title: 'Our Story & Philosophy',
        description: 'Einstein IQ Library was founded with a singular vision: to create the ultimate environment for focused learning and professional growth.',
        mission: 'To provide a distraction-free, premium space that empowers individuals to achieve their highest intellectual potential.',
        vision: 'To become the premier network of dedicated focus spaces for ambitious students and professionals worldwide.',
      },
    });
    console.log('✅ Created About Section');
  }

  // 4. Create Facilities
  const facilitiesCount = await prisma.facility.count();
  if (facilitiesCount === 0) {
    await prisma.facility.createMany({
      data: [
        { title: 'High-Speed Wi-Fi', description: 'Enterprise-grade internet connectivity.', icon: 'wifi', displayOrder: 1 },
        { title: 'Ergonomic Seating', description: 'Premium chairs designed for long hours.', icon: 'wind', displayOrder: 2 },
        { title: 'Silent Zones', description: 'Strictly monitored noise-free areas.', icon: 'shield', displayOrder: 3 },
      ],
    });
    console.log('✅ Created Facilities');
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
