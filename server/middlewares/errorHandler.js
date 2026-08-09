const errorHandler = (err, req, res, next) => {
  console.error('[Central Error Log]:', err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const code = err.code || 'SERVER_ERROR';
  const message = err.message || 'An unexpected internal error occurred.';

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
