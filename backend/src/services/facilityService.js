import * as facilityRepository from '../repositories/facilityRepository.js';

export const getAllFacilities = async () => {
  return facilityRepository.getAllFacilities();
};

export const getFacilityById = async (id) => {
  const facility = await facilityRepository.getFacilityById(id);
  if (!facility) {
    const error = new Error('Facility not found');
    error.statusCode = 404;
    throw error;
  }
  return facility;
};

export const createFacility = async (data) => {
  return facilityRepository.createFacility(data);
};

export const updateFacility = async (id, data) => {
  await getFacilityById(id); // Check existence
  return facilityRepository.updateFacility(id, data);
};

export const deleteFacility = async (id) => {
  await getFacilityById(id); // Check existence
  return facilityRepository.deleteFacility(id);
};
