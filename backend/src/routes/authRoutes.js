import express from 'express';
import * as authController from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../validations/authValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

export default router;
