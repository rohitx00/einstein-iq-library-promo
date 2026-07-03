import express from 'express';
import * as messageController from '../controllers/messageController.js';
import { validate } from '../middlewares/validate.js';
import { messageSchema } from '../validations/messageValidation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route (users submitting messages)
router.post('/', validate(messageSchema), messageController.createMessage);

// Protected routes (Admin managing messages)
router.get('/', protect, messageController.getAllMessages);
router.get('/:id', protect, messageController.getMessageById);
router.patch('/:id/read', protect, messageController.markAsRead);
router.delete('/:id', protect, messageController.deleteMessage);

export default router;
