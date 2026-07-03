import * as heroService from '../services/heroService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getHero = asyncHandler(async (req, res) => {
  const hero = await heroService.getHero();
  sendSuccess(res, 200, 'Hero section retrieved', hero);
});

export const updateHero = asyncHandler(async (req, res) => {
  const result = await heroService.updateHero(req.body, req.file);
  sendSuccess(res, 200, 'Hero section updated successfully', result);
});
