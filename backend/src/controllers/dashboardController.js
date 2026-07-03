import prisma from '../models/prismaClient.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    messagesCount,
    facilitiesCount,
    plansCount,
    galleryCount,
    testimonialsCount,
    faqsCount,
    recentMessages
  ] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.facility.count(),
    prisma.membershipPlan.count(),
    prisma.gallery.count(),
    prisma.testimonial.count(),
    prisma.fAQ.count(),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const stats = {
    messagesCount,
    facilitiesCount,
    plansCount,
    galleryCount,
    testimonialsCount,
    faqsCount,
    recentMessages
  };

  sendSuccess(res, 200, 'Dashboard stats retrieved', stats);
});
