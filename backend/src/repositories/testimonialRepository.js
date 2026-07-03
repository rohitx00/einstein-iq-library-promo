import prisma from '../models/prismaClient.js';

export const getAllTestimonials = async () => {
  return prisma.testimonial.findMany({
    orderBy: { displayOrder: 'asc' },
  });
};

export const getTestimonialById = async (id) => {
  return prisma.testimonial.findUnique({
    where: { id },
  });
};

export const createTestimonial = async (data) => {
  return prisma.testimonial.create({
    data,
  });
};

export const updateTestimonial = async (id, data) => {
  return prisma.testimonial.update({
    where: { id },
    data,
  });
};

export const deleteTestimonial = async (id) => {
  return prisma.testimonial.delete({
    where: { id },
  });
};
