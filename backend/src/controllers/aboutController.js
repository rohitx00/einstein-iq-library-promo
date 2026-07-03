import * as aboutService from '../services/aboutService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAbout = asyncHandler(async (req, res) => {
  const about = await aboutService.getAbout();
  sendSuccess(res, 200, 'About section retrieved', about);
});

export const updateAbout = asyncHandler(async (req, res) => {
  const result = await aboutService.updateAbout(req.body, req.file);
  sendSuccess(res, 200, 'About section updated successfully', result);
});
