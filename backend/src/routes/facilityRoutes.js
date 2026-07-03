import express from 'express';
import * as facilityController from '../controllers/facilityController.js';
import { validate } from '../middlewares/validate.js';
import { facilitySchema, facilityUpdateSchema } from '../validations/facilityValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', facilityController.getAllFacilities);
router.get('/:id', facilityController.getFacilityById);

// Protected routes (Admin only)
router.post('/', protect, validate(facilitySchema), facilityController.createFacility);
router.put('/:id', protect, validate(facilityUpdateSchema), facilityController.updateFacility);
router.delete('/:id', protect, facilityController.deleteFacility);

export default router;
