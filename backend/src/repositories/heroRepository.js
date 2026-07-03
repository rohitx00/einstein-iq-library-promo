import prisma from '../models/prismaClient.js';

export const getHero = async () => {
  return prisma.heroSection.findFirst();
};

export const upsertHero = async (data) => {
  const existing = await prisma.heroSection.findFirst();
  
  if (existing) {
    return prisma.heroSection.update({
      where: { id: existing.id },
      data,
    });
  }
  
  return prisma.heroSection.create({
    data,
  });
};
