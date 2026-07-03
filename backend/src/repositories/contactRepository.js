import prisma from '../models/prismaClient.js';

export const getContactInfo = async () => {
  return prisma.contactInfo.findFirst();
};

export const upsertContactInfo = async (data) => {
  const existing = await prisma.contactInfo.findFirst();
  
  if (existing) {
    return prisma.contactInfo.update({
      where: { id: existing.id },
      data,
    });
  }
  
  return prisma.contactInfo.create({
    data,
  });
};
