import prisma from '../models/prismaClient.js';

export const findAdminByEmail = async (email) => {
  return prisma.admin.findUnique({
    where: { email },
  });
};

export const findAdminById = async (id) => {
  return prisma.admin.findUnique({
    where: { id },
  });
};

export const updateAdmin = async (id, data) => {
  return prisma.admin.update({
    where: { id },
    data,
  });
};
