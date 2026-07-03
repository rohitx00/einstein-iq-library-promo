import express from 'express';
import * as planController from '../controllers/planController.js';
import { validate } from '../middlewares/validate.js';
import { planSchema, planUpdateSchema } from '../validations/planValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', planController.getAllPlans);
router.get('/:id', planController.getPlanById);

// Protected routes (Admin only)
router.post('/', protect, validate(planSchema), planController.createPlan);
router.put('/:id', protect, validate(planUpdateSchema), planController.updatePlan);
router.delete('/:id', protect, planController.deletePlan);

export default router;
