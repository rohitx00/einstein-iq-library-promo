import prisma from '../models/prismaClient.js';

export const getContactInfo = async () => {
  return prisma.contactInformation.findFirst();
};

export const upsertContactInfo = async (data) => {
  const existing = await prisma.contactInformation.findFirst();
  
  if (existing) {
    return prisma.contactInformation.update({
      where: { id: existing.id },
      data,
    });
  }
  
  return prisma.contactInformation.create({
    data,
  });
};
