import * as faqRepository from '../repositories/faqRepository.js';

export const getAllFAQs = async () => {
  return faqRepository.getAllFAQs();
};

export const getFAQById = async (id) => {
  const faq = await faqRepository.getFAQById(id);
  if (!faq) {
    const error = new Error('FAQ not found');
    error.statusCode = 404;
    throw error;
  }
  return faq;
};

export const createFAQ = async (data) => {
  return faqRepository.createFAQ(data);
};

export const updateFAQ = async (id, data) => {
  await getFAQById(id);
  return faqRepository.updateFAQ(id, data);
};

export const deleteFAQ = async (id) => {
  await getFAQById(id);
  return faqRepository.deleteFAQ(id);
};
