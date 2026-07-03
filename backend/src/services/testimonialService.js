import * as testimonialRepository from '../repositories/testimonialRepository.js';

export const getAllTestimonials = async () => {
  return testimonialRepository.getAllTestimonials();
};

export const getTestimonialById = async (id) => {
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    const error = new Error('Testimonial not found');
    error.statusCode = 404;
    throw error;
  }
  return testimonial;
};

export const createTestimonial = async (data) => {
  return testimonialRepository.createTestimonial(data);
};

export const updateTestimonial = async (id, data) => {
  await getTestimonialById(id);
  return testimonialRepository.updateTestimonial(id, data);
};

export const deleteTestimonial = async (id) => {
  await getTestimonialById(id);
  return testimonialRepository.deleteTestimonial(id);
};
