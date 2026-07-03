import * as contactRepository from '../repositories/contactRepository.js';

export const getContactInfo = async () => {
  return contactRepository.getContactInfo();
};

export const updateContactInfo = async (data) => {
  return contactRepository.upsertContactInfo(data);
};
