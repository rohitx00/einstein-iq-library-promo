import * as ruleService from '../services/ruleService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllRules = asyncHandler(async (req, res) => {
  const rules = await ruleService.getAllRules();
  sendSuccess(res, 200, 'Rules retrieved successfully', rules);
});

export const getRuleById = asyncHandler(async (req, res) => {
  const rule = await ruleService.getRuleById(req.params.id);
  sendSuccess(res, 200, 'Rule retrieved successfully', rule);
});

export const createRule = asyncHandler(async (req, res) => {
  const rule = await ruleService.createRule(req.body);
  sendSuccess(res, 201, 'Rule created successfully', rule);
});

export const updateRule = asyncHandler(async (req, res) => {
  const rule = await ruleService.updateRule(req.params.id, req.body);
  sendSuccess(res, 200, 'Rule updated successfully', rule);
});

export const deleteRule = asyncHandler(async (req, res) => {
  await ruleService.deleteRule(req.params.id);
  sendSuccess(res, 200, 'Rule deleted successfully');
});
