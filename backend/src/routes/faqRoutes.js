import express from 'express';
import * as faqController from '../controllers/faqController.js';
import { validate } from '../middlewares/validate.js';
import { faqSchema, faqUpdateSchema } from '../validations/faqValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', faqController.getAllFAQs);
router.get('/:id', faqController.getFAQById);

// Protected routes (Admin only)
router.post('/', protect, validate(faqSchema), faqController.createFAQ);
router.put('/:id', protect, validate(faqUpdateSchema), faqController.updateFAQ);
router.delete('/:id', protect, faqController.deleteFAQ);

export default router;
