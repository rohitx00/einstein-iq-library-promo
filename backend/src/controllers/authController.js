import * as authService from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginAdmin(email, password);

  // Set JWT as HTTP-only cookie
  res.cookie('jwt', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  sendSuccess(res, 200, 'Login successful', result);
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  sendSuccess(res, 200, 'Logged out successfully');
});

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, 'Admin data retrieved successfully', {
    admin: req.admin,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const adminId = req.admin.id;
  const updatedAdmin = await authService.updateProfile(adminId, name, email);
  sendSuccess(res, 200, 'Profile updated successfully', { admin: updatedAdmin });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin.id;
  await authService.changePassword(adminId, currentPassword, newPassword);
  sendSuccess(res, 200, 'Password changed successfully');
});
