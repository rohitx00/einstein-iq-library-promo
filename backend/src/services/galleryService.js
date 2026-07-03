import * as galleryRepository from '../repositories/galleryRepository.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinaryConfig.js';

export const getAllImages = async () => {
  return galleryRepository.getAllImages();
};

export const getImageById = async (id) => {
  const image = await galleryRepository.getImageById(id);
  if (!image) {
    const error = new Error('Image not found');
    error.statusCode = 404;
    throw error;
  }
  return image;
};

export const addImage = async (data, file) => {
  if (!file) {
    const error = new Error('Image file is required');
    error.statusCode = 400;
    throw error;
  }

  const result = await uploadToCloudinary(file.buffer, 'einstein_library/gallery');

  return galleryRepository.addImage({
    caption: data.caption,
    imageUrl: result.secure_url,
    imagePublicId: result.public_id,
  });
};

export const updateImage = async (id, data, file) => {
  const currentImage = await getImageById(id);
  let updateData = { caption: data.caption };

  if (file) {
    const result = await uploadToCloudinary(file.buffer, 'einstein_library/gallery');
    
    updateData.imageUrl = result.secure_url;
    updateData.imagePublicId = result.public_id;

    if (currentImage.imagePublicId) {
      await deleteFromCloudinary(currentImage.imagePublicId);
    }
  }

  return galleryRepository.updateImage(id, updateData);
};

export const deleteImage = async (id) => {
  const image = await getImageById(id);
  
  if (image.imagePublicId) {
    await deleteFromCloudinary(image.imagePublicId);
  }

  return galleryRepository.deleteImage(id);
};
