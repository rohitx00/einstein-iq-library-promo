import * as ruleRepository from '../repositories/ruleRepository.js';

export const getAllRules = async () => {
  return ruleRepository.getAllRules();
};

export const getRuleById = async (id) => {
  const rule = await ruleRepository.getRuleById(id);
  if (!rule) {
    const error = new Error('Rule not found');
    error.statusCode = 404;
    throw error;
  }
  return rule;
};

export const createRule = async (data) => {
  return ruleRepository.createRule(data);
};

export const updateRule = async (id, data) => {
  await getRuleById(id);
  return ruleRepository.updateRule(id, data);
};

export const deleteRule = async (id) => {
  await getRuleById(id);
  return ruleRepository.deleteRule(id);
};
