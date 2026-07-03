import prisma from '../models/prismaClient.js';

export const getAllPlans = async () => {
  return prisma.membershipPlan.findMany({
    orderBy: { displayOrder: 'asc' },
  });
};

export const getPlanById = async (id) => {
  return prisma.membershipPlan.findUnique({
    where: { id },
  });
};

export const createPlan = async (data) => {
  return prisma.membershipPlan.create({
    data,
  });
};

export const updatePlan = async (id, data) => {
  return prisma.membershipPlan.update({
    where: { id },
    data,
  });
};

export const deletePlan = async (id) => {
  return prisma.membershipPlan.delete({
    where: { id },
  });
};
