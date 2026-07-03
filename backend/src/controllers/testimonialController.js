import * as testimonialService from '../services/testimonialService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getAllTestimonials();
  sendSuccess(res, 200, 'Testimonials retrieved successfully', testimonials);
});

export const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.getTestimonialById(req.params.id);
  sendSuccess(res, 200, 'Testimonial retrieved successfully', testimonial);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.createTestimonial(req.body);
  sendSuccess(res, 201, 'Testimonial created successfully', testimonial);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
  sendSuccess(res, 200, 'Testimonial updated successfully', testimonial);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonial(req.params.id);
  sendSuccess(res, 200, 'Testimonial deleted successfully');
});
