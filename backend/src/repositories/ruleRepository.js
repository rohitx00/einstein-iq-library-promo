import prisma from '../models/prismaClient.js';

export const getAllRules = async () => {
  return prisma.libraryRule.findMany({
    orderBy: { displayOrder: 'asc' },
  });
};

export const getRuleById = async (id) => {
  return prisma.libraryRule.findUnique({
    where: { id },
  });
};

export const createRule = async (data) => {
  return prisma.libraryRule.create({
    data,
  });
};

export const updateRule = async (id, data) => {
  return prisma.libraryRule.update({
    where: { id },
    data,
  });
};

export const deleteRule = async (id) => {
  return prisma.libraryRule.delete({
    where: { id },
  });
};
