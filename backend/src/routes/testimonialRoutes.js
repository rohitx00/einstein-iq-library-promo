import express from 'express';
import * as testimonialController from '../controllers/testimonialController.js';
import { validate } from '../middlewares/validate.js';
import { testimonialSchema, testimonialUpdateSchema } from '../validations/testimonialValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

// Protected routes (Admin only)
import { upload } from '../middlewares/multerConfig.js';
router.post('/', protect, upload.single('image'), validate(testimonialSchema), testimonialController.createTestimonial);
router.put('/:id', protect, upload.single('image'), validate(testimonialUpdateSchema), testimonialController.updateTestimonial);
router.delete('/:id', protect, testimonialController.deleteTestimonial);

export default router;
