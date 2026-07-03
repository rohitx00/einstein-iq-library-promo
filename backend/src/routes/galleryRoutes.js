import express from 'express';
import * as galleryController from '../controllers/galleryController.js';
import { validate } from '../middlewares/validate.js';
import { gallerySchema } from '../validations/galleryValidation.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.get('/', galleryController.getAllImages);
router.get('/:id', galleryController.getImageById);

// Protected routes (Admin only)
router.post('/', protect, upload.single('image'), validate(gallerySchema), galleryController.addImage);
router.put('/:id', protect, upload.single('image'), validate(gallerySchema), galleryController.updateImage);
router.delete('/:id', protect, galleryController.deleteImage);

export default router;
