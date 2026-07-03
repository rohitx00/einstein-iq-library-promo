import * as testimonialRepository from '../repositories/testimonialRepository.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinaryConfig.js';

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

export const createTestimonial = async (data, file) => {
  let insertData = { ...data };
  if (file) {
    const result = await uploadToCloudinary(file.buffer, 'einstein_library/testimonials');
    insertData.imageUrl = result.secure_url;
    insertData.imagePublicId = result.public_id;
  }
  return testimonialRepository.createTestimonial(insertData);
};

export const updateTestimonial = async (id, data, file) => {
  const currentTestimonial = await getTestimonialById(id);
  let updateData = { ...data };
  
  if (file) {
    const result = await uploadToCloudinary(file.buffer, 'einstein_library/testimonials');
    updateData.imageUrl = result.secure_url;
    updateData.imagePublicId = result.public_id;

    if (currentTestimonial.imagePublicId) {
      await deleteFromCloudinary(currentTestimonial.imagePublicId);
    }
  }
  return testimonialRepository.updateTestimonial(id, updateData);
};

export const deleteTestimonial = async (id) => {
  const testimonial = await getTestimonialById(id);
  if (testimonial.imagePublicId) {
    await deleteFromCloudinary(testimonial.imagePublicId);
  }
  return testimonialRepository.deleteTestimonial(id);
};
