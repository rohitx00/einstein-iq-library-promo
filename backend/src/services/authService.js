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
