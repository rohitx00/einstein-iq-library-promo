import * as messageService from '../services/messageService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.getAllMessages();
  sendSuccess(res, 200, 'Messages retrieved successfully', messages);
});

export const getMessageById = asyncHandler(async (req, res) => {
  const message = await messageService.getMessageById(req.params.id);
  sendSuccess(res, 200, 'Message retrieved successfully', message);
});

export const createMessage = asyncHandler(async (req, res) => {
  const message = await messageService.createMessage(req.body);
  sendSuccess(res, 201, 'Message sent successfully', message);
});

export const markAsRead = asyncHandler(async (req, res) => {
  const message = await messageService.markAsRead(req.params.id);
  sendSuccess(res, 200, 'Message marked as read', message);
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await messageService.deleteMessage(req.params.id);
  sendSuccess(res, 200, 'Message deleted successfully');
});
