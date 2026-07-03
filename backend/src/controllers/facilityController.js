import * as facilityService from '../services/facilityService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllFacilities = asyncHandler(async (req, res) => {
  const facilities = await facilityService.getAllFacilities();
  sendSuccess(res, 200, 'Facilities retrieved successfully', facilities);
});

export const getFacilityById = asyncHandler(async (req, res) => {
  const facility = await facilityService.getFacilityById(req.params.id);
  sendSuccess(res, 200, 'Facility retrieved successfully', facility);
});

export const createFacility = asyncHandler(async (req, res) => {
  const facility = await facilityService.createFacility(req.body);
  sendSuccess(res, 201, 'Facility created successfully', facility);
});

export const updateFacility = asyncHandler(async (req, res) => {
  const facility = await facilityService.updateFacility(req.params.id, req.body);
  sendSuccess(res, 200, 'Facility updated successfully', facility);
});

export const deleteFacility = asyncHandler(async (req, res) => {
  await facilityService.deleteFacility(req.params.id);
  sendSuccess(res, 200, 'Facility deleted successfully');
});
