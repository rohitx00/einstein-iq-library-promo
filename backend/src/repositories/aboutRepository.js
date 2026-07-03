import prisma from '../models/prismaClient.js';

export const getAbout = async () => {
  return prisma.about.findFirst();
};

export const upsertAbout = async (data) => {
  const existing = await prisma.about.findFirst();
  
  if (existing) {
    return prisma.about.update({
      where: { id: existing.id },
      data,
    });
  }
  
  return prisma.about.create({
    data,
  });
};
