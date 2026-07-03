import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import heroRoutes from './routes/heroRoutes.js';

import aboutRoutes from './routes/aboutRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import planRoutes from './routes/planRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import ruleRoutes from './routes/ruleRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running', data: null });
});

// Routes will be mounted here
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hero', heroRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/facilities', facilityRoutes);
app.use('/api/v1/plans', planRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/rules', ruleRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
