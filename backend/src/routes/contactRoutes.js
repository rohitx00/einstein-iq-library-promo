import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { validate } from '../middlewares/validate.js';
import { contactUpdateSchema } from '../validations/contactValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', contactController.getContactInfo);
router.put('/', protect, validate(contactUpdateSchema), contactController.updateContactInfo);

export default router;
