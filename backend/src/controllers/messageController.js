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

export const updateMessageStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const message = await messageService.updateMessageStatus(req.params.id, status);
  sendSuccess(res, 200, `Message marked as ${status}`, message);
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await messageService.deleteMessage(req.params.id);
  sendSuccess(res, 200, 'Message deleted successfully');
});
