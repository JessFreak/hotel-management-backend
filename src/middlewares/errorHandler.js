import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    title: ReasonPhrases[statusCode] || 'Internal Server Error',
    status: statusCode,
    message: err.message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  next();
};
