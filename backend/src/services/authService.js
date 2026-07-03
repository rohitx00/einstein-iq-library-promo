import bcrypt from 'bcrypt';
import * as adminRepository from '../repositories/adminRepository.js';
import { generateToken } from '../utils/jwt.js';

export const loginAdmin = async (email, password) => {
  const admin = await adminRepository.findAdminByEmail(email);
  
  if (!admin) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(admin.id);
  
  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email
    },
    token
  };
};

export const updateProfile = async (id, name, email) => {
  const existingAdmin = await adminRepository.findAdminByEmail(email);
  if (existingAdmin && existingAdmin.id !== id) {
    const error = new Error('Email is already in use by another admin');
    error.statusCode = 400;
    throw error;
  }

  const updatedAdmin = await adminRepository.updateAdmin(id, { name, email });
  return {
    id: updatedAdmin.id,
    name: updatedAdmin.name,
    email: updatedAdmin.email
  };
};

export const changePassword = async (id, currentPassword, newPassword) => {
  const admin = await adminRepository.findAdminById(id);
  
  if (!admin) {
    const error = new Error('Admin not found');
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  
  if (!isMatch) {
    const error = new Error('Incorrect current password');
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await adminRepository.updateAdmin(id, { password: hashedPassword });
  
  return { success: true };
};
