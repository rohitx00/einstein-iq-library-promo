import prisma from '../models/prismaClient.js';

export const getAllFacilities = async () => {
  return prisma.facility.findMany({
    orderBy: { displayOrder: 'asc' },
  });
};

export const getFacilityById = async (id) => {
  return prisma.facility.findUnique({
    where: { id },
  });
};

export const createFacility = async (data) => {
  return prisma.facility.create({
    data,
  });
};

export const updateFacility = async (id, data) => {
  return prisma.facility.update({
    where: { id },
    data,
  });
};

export const deleteFacility = async (id) => {
  return prisma.facility.delete({
    where: { id },
  });
};
