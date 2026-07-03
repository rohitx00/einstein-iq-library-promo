import * as contactService from '../services/contactService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getContactInfo = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactInfo();
  sendSuccess(res, 200, 'Contact info retrieved successfully', contact);
});

export const updateContactInfo = asyncHandler(async (req, res) => {
  const contact = await contactService.updateContactInfo(req.body);
  sendSuccess(res, 200, 'Contact info updated successfully', contact);
});
