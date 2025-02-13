import { getStatusText } from 'http-status-codes';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    title: getStatusText(statusCode) || 'Internal Server Error',
    status: statusCode,
    message: err.message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
}