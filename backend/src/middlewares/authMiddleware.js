import { verifyToken } from '../utils/jwt.js';
import prisma from '../models/prismaClient.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies or Authorization header
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }

  try {
    const decoded = verifyToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!admin) {
      res.status(401);
      throw new Error('Admin not found');
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }
});
