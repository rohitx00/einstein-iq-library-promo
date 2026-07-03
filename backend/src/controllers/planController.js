import * as planService from '../services/planService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllPlans = asyncHandler(async (req, res) => {
  const plans = await planService.getAllPlans();
  sendSuccess(res, 200, 'Membership plans retrieved successfully', plans);
});

export const getPlanById = asyncHandler(async (req, res) => {
  const plan = await planService.getPlanById(req.params.id);
  sendSuccess(res, 200, 'Membership plan retrieved successfully', plan);
});

export const createPlan = asyncHandler(async (req, res) => {
  const plan = await planService.createPlan(req.body);
  sendSuccess(res, 201, 'Membership plan created successfully', plan);
});

export const updatePlan = asyncHandler(async (req, res) => {
  const plan = await planService.updatePlan(req.params.id, req.body);
  sendSuccess(res, 200, 'Membership plan updated successfully', plan);
});

export const deletePlan = asyncHandler(async (req, res) => {
  await planService.deletePlan(req.params.id);
  sendSuccess(res, 200, 'Membership plan deleted successfully');
});
