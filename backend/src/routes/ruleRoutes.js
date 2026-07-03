import express from 'express';
import * as ruleController from '../controllers/ruleController.js';
import { validate } from '../middlewares/validate.js';
import { ruleSchema, ruleUpdateSchema } from '../validations/ruleValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', ruleController.getAllRules);
router.get('/:id', ruleController.getRuleById);

// Protected routes (Admin only)
router.post('/', protect, validate(ruleSchema), ruleController.createRule);
router.put('/:id', protect, validate(ruleUpdateSchema), ruleController.updateRule);
router.delete('/:id', protect, ruleController.deleteRule);

export default router;
