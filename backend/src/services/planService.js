import * as planRepository from '../repositories/planRepository.js';

export const getAllPlans = async () => {
  return planRepository.getAllPlans();
};

export const getPlanById = async (id) => {
  const plan = await planRepository.getPlanById(id);
  if (!plan) {
    const error = new Error('Membership Plan not found');
    error.statusCode = 404;
    throw error;
  }
  return plan;
};

export const createPlan = async (data) => {
  return planRepository.createPlan(data);
};

export const updatePlan = async (id, data) => {
  await getPlanById(id);
  return planRepository.updatePlan(id, data);
};

export const deletePlan = async (id) => {
  await getPlanById(id);
  return planRepository.deletePlan(id);
};
