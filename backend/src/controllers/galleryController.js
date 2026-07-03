import * as galleryService from '../services/galleryService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllImages = asyncHandler(async (req, res) => {
  const images = await galleryService.getAllImages();
  sendSuccess(res, 200, 'Gallery images retrieved successfully', images);
});

export const getImageById = asyncHandler(async (req, res) => {
  const image = await galleryService.getImageById(req.params.id);
  sendSuccess(res, 200, 'Gallery image retrieved successfully', image);
});

export const addImage = asyncHandler(async (req, res) => {
  const image = await galleryService.addImage(req.body, req.file);
  sendSuccess(res, 201, 'Image added to gallery successfully', image);
});

export const updateImage = asyncHandler(async (req, res) => {
  const image = await galleryService.updateImage(req.params.id, req.body, req.file);
  sendSuccess(res, 200, 'Gallery image updated successfully', image);
});

export const deleteImage = asyncHandler(async (req, res) => {
  await galleryService.deleteImage(req.params.id);
  sendSuccess(res, 200, 'Gallery image deleted successfully');
});
