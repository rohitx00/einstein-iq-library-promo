import express from 'express';
import * as aboutController from '../controllers/aboutController.js';
import { validate } from '../middlewares/validate.js';
import { aboutUpdateSchema } from '../validations/aboutValidation.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.get('/', aboutController.getAbout);
router.put('/', protect, upload.single('image'), validate(aboutUpdateSchema), aboutController.updateAbout);

export default router;
