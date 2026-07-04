import * as messageRepository from '../repositories/messageRepository.js';

export const getAllMessages = async () => {
  return messageRepository.getAllMessages();
};

export const getMessageById = async (id) => {
  const message = await messageRepository.getMessageById(id);
  if (!message) {
    const error = new Error('Message not found');
    error.statusCode = 404;
    throw error;
  }
  return message;
};

export const createMessage = async (data) => {
  return messageRepository.createMessage(data);
};

export const updateMessageStatus = async (id, status) => {
  await getMessageById(id);
  return messageRepository.updateMessageStatus(id, status);
};

export const deleteMessage = async (id) => {
  await getMessageById(id);
  return messageRepository.deleteMessage(id);
};
