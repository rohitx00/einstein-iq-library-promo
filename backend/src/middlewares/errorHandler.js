export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Prisma Errors
  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Handle Zod Validation Errors
  if (err.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation Error';
    return res.status(statusCode).json({
      success: false,
      message,
      errors: (err.errors || err.issues || []).map(e => ({ path: e.path ? e.path.join('.') : '', message: e.message }))
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
