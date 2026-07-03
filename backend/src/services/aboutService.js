import * as aboutRepository from '../repositories/aboutRepository.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinaryConfig.js';

export const getAbout = async () => {
  return aboutRepository.getAbout();
};

export const updateAbout = async (data, file) => {
  let updateData = { ...data };

  if (file) {
    const result = await uploadToCloudinary(file.buffer, 'einstein_library/about');
    
    updateData.imageUrl = result.secure_url;
    updateData.imagePublicId = result.public_id;

    const currentAbout = await aboutRepository.getAbout();
    if (currentAbout && currentAbout.imagePublicId) {
      await deleteFromCloudinary(currentAbout.imagePublicId);
    }
  }

  return aboutRepository.upsertAbout(updateData);
};
