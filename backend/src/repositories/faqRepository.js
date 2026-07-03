import prisma from '../models/prismaClient.js';

export const getAllFAQs = async () => {
  return prisma.fAQ.findMany({
    orderBy: { displayOrder: 'asc' },
  });
};

export const getFAQById = async (id) => {
  return prisma.fAQ.findUnique({
    where: { id },
  });
};

export const createFAQ = async (data) => {
  return prisma.fAQ.create({
    data,
  });
};

export const updateFAQ = async (id, data) => {
  return prisma.fAQ.update({
    where: { id },
    data,
  });
};

export const deleteFAQ = async (id) => {
  return prisma.fAQ.delete({
    where: { id },
  });
};
