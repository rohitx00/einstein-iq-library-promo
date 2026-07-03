import * as faqService from '../services/faqService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllFAQs = asyncHandler(async (req, res) => {
  const faqs = await faqService.getAllFAQs();
  sendSuccess(res, 200, 'FAQs retrieved successfully', faqs);
});

export const getFAQById = asyncHandler(async (req, res) => {
  const faq = await faqService.getFAQById(req.params.id);
  sendSuccess(res, 200, 'FAQ retrieved successfully', faq);
});

export const createFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.createFAQ(req.body);
  sendSuccess(res, 201, 'FAQ created successfully', faq);
});

export const updateFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.updateFAQ(req.params.id, req.body);
  sendSuccess(res, 200, 'FAQ updated successfully', faq);
});

export const deleteFAQ = asyncHandler(async (req, res) => {
  await faqService.deleteFAQ(req.params.id);
  sendSuccess(res, 200, 'FAQ deleted successfully');
});
