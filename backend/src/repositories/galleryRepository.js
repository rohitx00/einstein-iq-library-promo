import prisma from '../models/prismaClient.js';

export const getAllImages = async () => {
  return prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getImageById = async (id) => {
  return prisma.gallery.findUnique({
    where: { id },
  });
};

export const addImage = async (data) => {
  return prisma.gallery.create({
    data,
  });
};

export const updateImage = async (id, data) => {
  return prisma.gallery.update({
    where: { id },
    data,
  });
};

export const deleteImage = async (id) => {
  return prisma.gallery.delete({
    where: { id },
  });
};
