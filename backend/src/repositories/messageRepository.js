import prisma from '../models/prismaClient.js';

export const getAllMessages = async () => {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getMessageById = async (id) => {
  return prisma.contactMessage.findUnique({
    where: { id },
  });
};

export const createMessage = async (data) => {
  return prisma.contactMessage.create({
    data,
  });
};

export const markAsRead = async (id) => {
  return prisma.contactMessage.update({
    where: { id },
    data: { status: 'read' },
  });
};

export const deleteMessage = async (id) => {
  return prisma.contactMessage.delete({
    where: { id },
  });
};
