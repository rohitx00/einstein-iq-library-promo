import * as heroRepository from '../repositories/heroRepository.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinaryConfig.js';

export const getHero = async () => {
  return heroRepository.getHero();
};

export const updateHero = async (data, file) => {
  let updateData = { ...data };

  if (file) {
    // Upload new image
    const result = await uploadToCloudinary(file.buffer, 'einstein_library/hero');
    
    updateData.imageUrl = result.secure_url;
    updateData.imagePublicId = result.public_id;

    // Delete old image if it exists
    const currentHero = await heroRepository.getHero();
    if (currentHero && currentHero.imagePublicId) {
      await deleteFromCloudinary(currentHero.imagePublicId);
    }
  }

  return heroRepository.upsertHero(updateData);
};
