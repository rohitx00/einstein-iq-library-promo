import express from 'express';
import * as heroController from '../controllers/heroController.js';
import { validate } from '../middlewares/validate.js';
import { heroUpdateSchema } from '../validations/heroValidation.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();

// Public route
router.get('/', heroController.getHero);

// Protected route (Admin only)
router.put('/', protect, upload.single('image'), validate(heroUpdateSchema), heroController.updateHero);

export default router;
