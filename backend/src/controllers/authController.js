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
    sameSite: 'strict',
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
